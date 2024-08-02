import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerOptionsEntity } from '../entities/answer-options.entity';
import { UsersService } from '../../users/services/users.service';
import { UpdateAnswerOptionsDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { AnswerOptionsStatus } from '../interfaces';

@Injectable()
export class AnswerOptionsService {
  private readonly logger = new Logger(AnswerOptionsService.name);
  constructor(
    @InjectRepository(AnswerOptionsEntity)
    private readonly answerOptionsRepository: Repository<AnswerOptionsEntity>,
    private readonly usersService: UsersService,
  ) {}

  //function to update a new answerOption
  public async updateAnswerOption(
    optionId: string,
    userId: string,
    body: UpdateAnswerOptionsDTO,
  ): Promise<Response<object>> {
    try {
      const userExist = await this.usersService.getUserById(userId);

      if (!userExist)
        throw ErrorManager.createCustomError(
          'Usuario no encontrado',
          HttpStatus.NOT_FOUND,
        );

      const updatedAnswerOption = await this.answerOptionsRepository.update(
        { id: optionId },
        body,
      );

      if (!updatedAnswerOption)
        throw ErrorManager.createCustomError(
          'No se encontró la opción de respuesta con ese ID',
          HttpStatus.CONFLICT,
        );

      const response: Response<object> = {
        statusCode: HttpStatus.OK,
        message: 'Se actualizó la opción de respuesta correctamente.',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating this question: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to logic delete a answer option
  public async logicDeleteAnswerOption(
    optionId: string,
    userId: string,
  ): Promise<Response<object>> {
    try {
      const userExist = await this.usersService.getUserById(userId);

      if (!userExist)
        throw ErrorManager.createCustomError(
          'Usuario no encontrado',
          HttpStatus.NOT_FOUND,
        );

      const deletedAnswerOption = await this.answerOptionsRepository.update(
        { id: optionId },
        { status: AnswerOptionsStatus.INACTIVE },
      );

      if (!deletedAnswerOption)
        throw ErrorManager.createCustomError(
          'No se encontró la opción de respuesta con ese ID',
          HttpStatus.CONFLICT,
        );

      const response: Response<object> = {
        statusCode: HttpStatus.OK,
        message: 'Se eliminó la opción de respuesta correctamente.',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting this question: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
