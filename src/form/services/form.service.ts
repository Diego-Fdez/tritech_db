import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { FormEntity } from '../entities/form.entity';
import { UsersService } from '../../users/services/users.service';
import { ClientsService } from '../../clients/services/clients.service';
import { ErrorManager, Response } from '../../utils';
import { CreateFormDTO, UpdateFormDTO } from '../dto';
import { QuestionEntity } from '../../question/entities/question.entity';
import { FormattedFormInterface, FormStatus } from '../interfaces';
import { TemplateTypesEnum } from 'src/templates/interfaces';

@Injectable()
export class FormService {
  private readonly logger = new Logger(FormService.name);
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
  ) {}

  //function to create a new form
  public async createForm(body: CreateFormDTO): Promise<Response<any>> {
    const { clientId, createdById, title, questions } = body;

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userExist = await this.usersService.getUserById(createdById);

      if (!userExist) {
        throw ErrorManager.createCustomError(
          'No se encontró usuario con ese ID',
          HttpStatus.CONFLICT,
        );
      }

      const clientExist = await this.clientsService.getClientById(clientId);

      if (!clientExist) {
        throw ErrorManager.createCustomError(
          'No se encontró cliente con ese ID',
          HttpStatus.CONFLICT,
        );
      }

      //create the new form
      const newForm = await queryRunner.manager.save(FormEntity, {
        clientId,
        createdById,
        title,
        description: body?.description,
      });

      const questionEntity = questions.map((question) => ({
        ...question,
        formId: newForm.id,
      }));

      const savedQuestions = await queryRunner.manager.save(
        QuestionEntity,
        questionEntity,
      );

      /* map on questions: We iterate over each question in questions and search for the corresponding question in savedQuestions using the lowercase question text. 
      If we find a corresponding saved question, we iterate over the question options and add the questionId to each option.
      filter on updated questions: We filter questions that have a 'single-choice' or 'multiple-choice' question type.
      flatMap on filtered questions: We flatten the options */
      const optionsEntity = questions
        .map((question) => {
          const savedQuestion = savedQuestions.find(
            (savedQuestion) =>
              question.textQuestion.toLocaleLowerCase() ===
              savedQuestion.textQuestion.toLocaleLowerCase(),
          );

          if (savedQuestion?.options) {
            question?.options?.forEach((option) => {
              option.questionId = savedQuestion.id;
            });
          }

          return question;
        })
        .filter(
          (question) =>
            question?.typeQuestion === 'single-choice' ||
            question?.typeQuestion === 'multiple-choice',
        )
        .flatMap((question) => question.options);

      await queryRunner.manager.save('AnswerOptionsEntity', optionsEntity);

      await queryRunner.commitTransaction();

      const response: Response<any> = {
        statusCode: HttpStatus.CREATED,
        message: 'Formulario creado con éxito',
      };

      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error(`Error creating a new form: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  //function to get FormById
  public async getFormById(id: string): Promise<Response<FormEntity[]>> {
    try {
      const form: FormEntity[] = await this.formRepository.find({
        where: { id },
        relations: ['questions', 'client', 'createdBy', 'questions.options'],
        order: { questions: { order: 'ASC' } },
        select: {
          id: true,
          title: true,
          description: true,
          client: {
            clientName: true,
          },
          createdBy: {
            fullName: true,
          },
          createdAt: true,
          questions: {
            id: true,
            typeQuestion: true,
            textQuestion: true,
            order: true,
            options: {
              id: true,
              optionText: true,
              questionId: true,
            },
          },
        },
      });

      //const answers = await this
      if (!form) {
        throw ErrorManager.createCustomError(
          `No encontramos el formulario con el ID: ${id}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<FormEntity[]> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: form,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new form: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get a form by clientID
  public async getFormByClientId(
    clientId: string,
  ): Promise<Response<FormattedFormInterface[]>> {
    try {
      const forms: FormEntity[] = await this.formRepository.find({
        where: { clientId },
      });

      if (!forms) {
        throw ErrorManager.createCustomError(
          `No encontramos el formulario con el ID: ${clientId}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const formattedForm: FormattedFormInterface[] = forms.map((form) => ({
        id: form.id,
        clientId: form.clientId,
        templateName: form.title,
        createdBy: form.createdById,
        status: form.status,
        templateType: TemplateTypesEnum.CHECKLIST,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
      }));

      const response: Response<FormattedFormInterface[]> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: formattedForm,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new form: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to update a form by id
  public async updateFormById(
    id: string,
    body: UpdateFormDTO,
  ): Promise<Response<any>> {
    const { title, description } = body;

    try {
      const updatedForm = await this.formRepository.update(
        { id },
        { title, description },
      );

      if (updatedForm.affected === 0) {
        throw ErrorManager.createCustomError(
          `No encontramos el formulario con el ID: ${id}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const form = await this.formRepository.findOneBy({ id });

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'Formulario actualizado con éxito',
        data: form,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating a form: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function logicDelete by ID
  public async logicDeleteFormById(
    questionId: string,
    userId: string,
  ): Promise<Response<any>> {
    try {
      const userExist = await this.usersService.getUserById(userId);

      if (!userExist)
        throw ErrorManager.createCustomError(
          'Usuario no encontrado',
          HttpStatus.NOT_FOUND,
        );

      const formExist = await this.formRepository.update(
        { id: questionId },
        { status: FormStatus.INACTIVE },
      );

      if (!formExist) {
        throw ErrorManager.createCustomError(
          `No encontramos el formulario con el ID: ${questionId}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'Formulario desactivado con éxito',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a form: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
