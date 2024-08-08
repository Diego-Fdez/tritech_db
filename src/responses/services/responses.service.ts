import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponsesEntity } from '../entities/responses.entity';
import { ErrorManager, Response } from '../../utils';
import { CreateResponseDTO } from '../dto';

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);
  constructor(
    @InjectRepository(ResponsesEntity)
    private readonly responsesRepository: Repository<ResponsesEntity>,
  ) {}

  //function to create a new response
  public async createResponse(body: CreateResponseDTO): Promise<object> {
    try {
      const result: ResponsesEntity = await this.responsesRepository.save(body);

      const response: Response<object> = {
        statusCode: HttpStatus.CREATED,
        message: 'OK',
        data: { id: result.id },
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new response: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get answers by response_id
  public async getAnswersByResponseId(
    responseId: string,
  ): Promise<Response<ResponsesEntity>> {
    try {
      const result: ResponsesEntity = await this.responsesRepository.findOne({
        where: { id: responseId },
        relations: [
          'answers',
          'answers.question',
          'form',
          'form.client',
          'user',
        ],
        order: { answers: { question: { order: 'ASC' } } },
        select: {
          id: true,
          formId: true,
          answers: {
            id: true,
            answerValue: true,
            createdAt: true,
            question: {
              id: true,
              textQuestion: true,
              typeQuestion: true,
              order: true,
            },
          },
          form: {
            clientId: true,
            client: {
              clientName: true,
            },
          },
          user: {
            id: true,
            fullName: true,
          },
        },
      });

      if (!result)
        throw new ErrorManager.createCustomError(
          'No encontramos respuestas registradas.',
          HttpStatus.NOT_FOUND,
        );

      const response: Response<ResponsesEntity> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: result,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting answers by response_id: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
