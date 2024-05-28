import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplatesEntity } from '../entities/templates.entity';
import { TemplatesCreateDTO, TemplatesUpdateDTO } from '../dto/templates.dto';
import { ErrorManager, Response } from '../../utils';
import { UsersService } from '../../users/services/users.service';
import { ClientsService } from '../../clients/services/clients.service';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);
  constructor(
    @InjectRepository(TemplatesEntity)
    private readonly templatesRepository: Repository<TemplatesEntity>,
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
  ) {}

  //function to create a new template
  public async createTemplate(
    body: TemplatesCreateDTO,
  ): Promise<Response<TemplatesEntity>> {
    const { createdBy, clientId, templateName } = body;

    const data = {
      createdBy,
      clientId,
      templateName: templateName.toLowerCase().trim(),
    };

    try {
      await this.usersService.getUserById(createdBy);

      await this.clientsService.getClientById(clientId);

      await this.templatesRepository.save(data);

      const response: Response<TemplatesEntity> = {
        statusCode: HttpStatus.CREATED,
        message: 'Template has been created successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new template: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get all templates
  public async getAllTemplates(): Promise<Response<TemplatesEntity[]>> {
    try {
      const templates: TemplatesEntity[] =
        await this.templatesRepository.find();

      if (templates.length === 0) {
        throw ErrorManager.createCustomError(
          'No templates found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<TemplatesEntity[]> = {
        statusCode: HttpStatus.OK,
        message: 'Templates found successfully',
        data: templates,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting all templates: ${error}`);
      throw error;
    }
  }

  //function to get a template by id, if not found, throw an error
  public async getTemplateById(id: string): Promise<Response<TemplatesEntity>> {
    try {
      const template: TemplatesEntity = await this.templatesRepository.findOne({
        where: { id },
        relations: ['client', 'user'],
        select: {
          id: true,
          clientId: true,
          templateName: true,
          createdBy: true,
          client: { clientName: true },
          user: { fullName: true },
        },
      });

      if (!template) {
        throw ErrorManager.createCustomError(
          `Template with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<TemplatesEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Template found successfully',
        data: template,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a template by id: ${error}`);
      throw error;
    }
  }

  //function to get a template by name, if not found, throw an error
  public async getTemplateByName(
    templateName: string,
  ): Promise<Response<TemplatesEntity>> {
    try {
      const template: TemplatesEntity =
        await this.templatesRepository.findOneBy({
          templateName,
        });

      if (!template) {
        throw ErrorManager.createCustomError(
          `Template with name: ${templateName} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<TemplatesEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Template found successfully',
        data: template,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a template by name: ${error}`);
      throw error;
    }
  }

  //function to update a template by id, if not found, throw an error
  public async updateTemplateById(
    id: string,
    body: TemplatesUpdateDTO,
  ): Promise<Response<TemplatesEntity>> {
    try {
      const templateUpdated = await this.templatesRepository.update(id, body);

      if (templateUpdated?.affected === 0) {
        throw ErrorManager.createCustomError(
          `Template with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const template: TemplatesEntity =
        await this.templatesRepository.findOneBy({ id });

      const response: Response<TemplatesEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Template updated successfully',
        data: template,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating a template by id: ${error}`);
      throw error;
    }
  }

  //function to delete a template by id, if not found, throw an error
  public async deleteTemplateById(id: string): Promise<Response<any>> {
    try {
      const template = await this.templatesRepository.delete(id);

      if (template?.affected === 0) {
        throw ErrorManager.createCustomError(
          `Template with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Template deleted',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a template by id: ${error}`);
      throw error;
    }
  }
}
