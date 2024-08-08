import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { ResponsesService } from '../services/responses.service';
import { CreateResponseDTO } from '../dto';
import { Roles } from '../../auth/decorators';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responseService: ResponsesService) {}

  //function to create a new response
  @Roles('BASIC')
  @Post('/')
  public async createResponse(
    @Body() body: CreateResponseDTO,
    @Response() res: Res,
  ) {
    try {
      const newResponse = await this.responseService.createResponse(body);

      res.send(newResponse);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get answers by response_id
  @Roles('BASIC')
  @Get('/:responseId')
  public async getAnswersByResponseId(
    @Param('responseId') responseId: string,
    @Response() res: Res,
  ) {
    try {
      const answers = await this.responseService.getAnswersByResponseId(
        responseId,
      );

      res.send(answers);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
