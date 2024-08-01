import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from '../entities/question.entity';
import { UsersService } from '../../users/services/users.service';
import { UpdateQuestionDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { QuestionStatus } from '../interfaces';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    private readonly usersService: UsersService,
  ) {}

  //function to update a question
  public async updateQuestionByFormId(
    questionId: string,
    userId: string,
    body: UpdateQuestionDTO,
  ): Promise<Response<any>> {
    try {
      const userExist = await this.usersService.getUserById(userId);

      if (!userExist)
        throw ErrorManager.createCustomError(
          'Usuario no encontrado',
          HttpStatus.NOT_FOUND,
        );

      const updatedQuestion = await this.questionRepository.update(
        { id: questionId },
        body,
      );

      if (!updatedQuestion) {
        throw ErrorManager.createCustomError(
          'No se encontró la pregunta con ese ID',
          HttpStatus.CONFLICT,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'Se actualizó la pregunta correctamente.',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating this question: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to logic delete a question by ID
  public async logicDeleteQuestionById(
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

      const questionExist = await this.questionRepository.update(
        { id: questionId },
        { status: QuestionStatus.INACTIVE },
      );

      if (!questionExist) {
        throw ErrorManager.createCustomError(
          'No se encontró la pregunta con ese ID',
          HttpStatus.CONFLICT,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'Se eliminó la pregunta correctamente.',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting this question: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
