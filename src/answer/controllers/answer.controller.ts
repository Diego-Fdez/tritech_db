import { Body, Controller, Param, Post, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { AnswerService } from '../services/answer.service';
import { Roles } from '../../auth/decorators';
import { CreateAnswerDTO } from '../dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  //function to register answers
  @Roles('BASIC')
  @Post('/:userId')
  public async createAnswer(
    @Body() body: CreateAnswerDTO,
    @Param('userId') userId: string,
    @Query('formId') formId: string,
    @Response() res: Res,
  ) {
    try {
      const response = await this.answerService.createAnswer(
        body,
        userId,
        formId,
      );

      res.status(response.statusCode).send(response);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
