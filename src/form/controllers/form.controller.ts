import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { FormService } from '../services/form.service';
import { Roles } from '../../auth/decorators';
import { CreateFormDTO, UpdateFormDTO } from '../dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  //create a new form
  @Roles('BASIC')
  @Post('/')
  public async createNewForm(
    @Body() body: CreateFormDTO,
    @Response() res: Res,
  ) {
    try {
      const newForm = await this.formService.createForm(body);

      res.send(newForm);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //fn to get a form by ID
  @Roles('BASIC')
  @Get('/:formId')
  public async getFormById(
    @Param('formId') formId: string,
    @Response() res: Res,
  ) {
    try {
      const form = await this.formService.getFormById(formId);

      res.send(form);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //fn to get a form by client ID
  @Roles('BASIC')
  @Get('/client/:clientId')
  public async getFormByClientId(
    @Param('clientId') clientId: string,
    @Response() res: Res,
  ) {
    try {
      const form = await this.formService.getFormByClientId(clientId);

      res.send(form);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //fn to update a form by ID
  @Roles('BASIC')
  @Patch('/:formId')
  public async updateFormById(
    @Param('formId') formId: string,
    @Body() body: UpdateFormDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedForm = await this.formService.updateFormById(formId, body);

      res.send(updatedForm);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //fn to logic delete a form by ID
  @Roles('ADMIN')
  @Patch('/delete/:formId')
  public async logicDeleteFormById(
    @Param('formId') formId: string,
    @Query('userId') userId: string,
    @Response() res: Res,
  ) {
    try {
      const deletedForm = await this.formService.logicDeleteFormById(
        formId,
        userId,
      );

      res.send(deletedForm);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
