import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { QuestionService } from '../services/question.service';
import { Roles } from '../../auth/decorators';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  //fn to update a question by ID
  @Roles('BASIC')
  @Patch('/:questionId')
  public async updateQuestion(
    @Param('questionId') questionId: string,
    @Query('userId') userId: string,
    @Body() body: any,
    @Response() res: Res,
  ) {
    try {
      const updatedQuestion = await this.questionService.updateQuestionByFormId(
        questionId,
        userId,
        body,
      );
      res.send(updatedQuestion);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to logic delete a question by ID
  @Roles('ADMIN')
  @Patch('/delete/:questionId')
  public async logicDeleteQuestion(
    @Param('questionId') questionId: string,
    @Query('userId') userId: string,
    @Response() res: Res,
  ) {
    try {
      const deletedQuestion =
        await this.questionService.logicDeleteQuestionById(questionId, userId);
      res.send(deletedQuestion);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
