import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { FormEntity } from '../entities/form.entity';
import { UsersService } from '../../users/services/users.service';
import { ClientsService } from '../../clients/services/clients.service';
import { ErrorManager, Response } from '../../utils';
import { CreateFormDTO } from '../dto';
import { QuestionEntity } from 'src/question/entities/question.entity';

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
}
