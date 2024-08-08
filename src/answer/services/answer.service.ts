import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { AnswerEntity } from '../entities/answer.entity';
import { CreateAnswerDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { UsersService } from '../../users/services/users.service';
import { FormService } from '../../form/services/form.service';
import { ResponsesEntity } from '../../responses/entities/responses.entity';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    private readonly dataSource: DataSource,
    private readonly userService: UsersService,
    private readonly formRepository: FormService,
  ) {}

  //function to register a new answer
  public async createAnswer(
    body: CreateAnswerDTO,
    userId: string,
    formId: string,
  ): Promise<Response<object>> {
    const { answers } = body;

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const form = await this.formRepository.getFormById(formId);
      const user = await this.userService.getUserById(userId);

      if (!form || !user) {
        throw ErrorManager.createCustomError(
          'usuario o formulario incorrectos.',
          HttpStatus.NOT_FOUND,
        );
      }

      const responseEntity = await queryRunner.manager.save(ResponsesEntity, {
        formId,
        userId,
      });

      const answerEntities = answers.map((answer) => {
        return {
          answerValue: answer.answerValue,
          questionId: answer.questionId,
          responseId: responseEntity.id,
        };
      });

      await queryRunner.manager.save('AnswerEntity', answerEntities);

      await queryRunner.commitTransaction();

      const response: Response<object> = {
        statusCode: HttpStatus.OK,
        message: 'Respuestas registradas correctamente',
        data: { id: responseEntity.id },
      };

      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error(`Error saving the answers: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
