import { Body, Controller, Post, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { FormService } from '../services/form.service';
import { Roles } from '../../auth/decorators';
import { CreateFormDTO } from '../dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  //create a new form
  @Roles('BASIC')
  @Post()
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
}
