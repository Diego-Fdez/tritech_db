import {
  Body,
  Controller,
  Param,
  Patch,
  Query,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AnswerOptionsService } from '../services/answer-options.service';
import { Roles } from '../../auth/decorators';
import { UpdateAnswerOptionsDTO } from '../dto';

@Controller('answer-options')
export class AnswerOptionsController {
  constructor(private readonly answerOptionService: AnswerOptionsService) {}

  //function to update a answer option
  @Roles('BASIC')
  @Patch('/:optionId')
  public async updateAnswerOption(
    @Param('optionId') optionId: string,
    @Query('userId') userId: string,
    @Body() body: UpdateAnswerOptionsDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedAnswerOption =
        await this.answerOptionService.updateAnswerOption(
          optionId,
          userId,
          body,
        );

      res.status(updatedAnswerOption.statusCode).send(updatedAnswerOption);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to logic delete a answer option
  @Roles('ADMIN')
  @Patch('/delete/:optionId')
  public async logicDeleteAnswerOption(
    @Param('optionId') optionId: string,
    @Query('userId') userId: string,
    @Response() res: Res,
  ) {
    try {
      const deletedAnswerOption =
        await this.answerOptionService.logicDeleteAnswerOption(
          optionId,
          userId,
        );

      res.status(deletedAnswerOption.statusCode).send(deletedAnswerOption);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
