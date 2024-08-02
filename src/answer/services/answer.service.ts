import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import { AnswerEntity } from '../entities/answer.entity';
import { CreateAnswerDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly dataSource: DataSource,
  ) {}

  //function to register a new answer
  public async createAnswer(body: CreateAnswerDTO): Promise<Response<object>> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(body);

      await queryRunner.commitTransaction();

      const response: Response<object> = {
        statusCode: HttpStatus.OK,
        message: 'Respuestas registradas correctamente',
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
