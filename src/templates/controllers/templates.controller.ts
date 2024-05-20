import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  public async createTemplate(@Body() body: TemplatesCreateDTO) {
    return await this.templatesService.createTemplate(body);
  }

  //function to get all templates
  @Roles('BASIC')
  @Get()
  public async getAllTemplates() {
    return await this.templatesService.getAllTemplates();
  }

  //function to get a template by ID
  @Roles('BASIC')
  @Get('/id/:id')
  public async getTemplateById(@Param('id') id: string) {
    return await this.templatesService.getTemplateById(id);
  }

  //function to get a template by templateName
  @Roles('BASIC')
  @Get('/:name')
  public async getTemplateByName(@Param('name') templateName: string) {
    return await this.templatesService.getTemplateByName(templateName);
  }

  //function to update a template by ID
  @Roles('BASIC')
  @Patch('/:id')
  public async updateTemplateById(
    @Param('id') id: string,
    @Body() body: TemplatesUpdateDTO,
  ) {
    return await this.templatesService.updateTemplateById(id, body);
  }

  //function to delete a template by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteTemplateById(@Param('id') id: string) {
    return await this.templatesService.deleteTemplateById(id);
  }
}
