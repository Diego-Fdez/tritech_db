import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AuthGuard, RolesGuard, OwnershipGuard } from '../../auth/guards';
import { TemplatesService } from '../services/templates.service';
import { Roles } from '../../auth/decorators';
import { TemplatesCreateDTO, TemplatesUpdateDTO } from '../dto/templates.dto';

@Controller('templates')
@UseGuards(AuthGuard, RolesGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  //function to create a new template
  @Roles('BASIC')
  @Post()
  public async createTemplate(
    @Body() body: TemplatesCreateDTO,
    @Response() res: Res,
  ) {
    try {
      const newTemplate = await this.templatesService.createTemplate(body);

      res.send(newTemplate);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get all templates
  @Roles('BASIC')
  @Get()
  public async getAllTemplates(@Response() res: Res) {
    try {
      const templates = await this.templatesService.getAllTemplates();

      res.send(templates);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a template by ID
  @Roles('BASIC')
  @Get('/id/:id')
  public async getTemplateById(@Param('id') id: string, @Response() res: Res) {
    try {
      const template = await this.templatesService.getTemplateById(id);

      res.send(template);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to update a template by ID
  @Roles('BASIC')
  @Patch('/:id')
  public async updateTemplateById(
    @Param('id') id: string,
    @Body() body: TemplatesUpdateDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedTemplate = await this.templatesService.updateTemplateById(
        id,
        body,
      );

      res.send(updatedTemplate);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to delete a template by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteTemplateById(
    @Param('id') id: string,
    @Response() res: Res,
  ) {
    try {
      const deletedTemplate = await this.templatesService.deleteTemplateById(
        id,
      );

      res.send(deletedTemplate);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
