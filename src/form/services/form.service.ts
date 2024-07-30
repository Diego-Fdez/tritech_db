import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { FormEntity } from '../entities/form.entity';
import { UsersService } from '../../users/services/users.service';
import { ClientsService } from '../../clients/services/clients.service';
import { ErrorManager, Response } from '../../utils';
import { CreateFormDTO } from '../dto';

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

      //create and save the questions for the form
      const questionsForm = questions.map((question) => ({
        ...question,
        formId: newForm.id,
      }));

      await queryRunner.manager.save('QuestionEntity', questionsForm);

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
}
