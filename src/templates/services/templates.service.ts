import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { TemplatesEntity } from '../entities/templates.entity';
import { TemplatesCreateDTO, TemplatesUpdateDTO } from '../dto/templates.dto';
import { ErrorManager, Response } from '../../utils';
import { UsersService } from '../../users/services/users.service';
import { ClientsService } from '../../clients/services/clients.service';
import { CreateTemplateInterface, TemplateTypesEnum } from '../interfaces';
import { MillComponentsService } from '../../mill-components/services/mill-components.service';
import { MillComponentsInterface } from '../../mill-components/interfaces';
import { filterComponents } from '../../utils/filteredTemplates';
import { FormService } from '../../form/services/form.service';
import { FormattedFormInterface } from 'src/form/interfaces';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);
  constructor(
    @InjectRepository(TemplatesEntity)
    private readonly templatesRepository: Repository<TemplatesEntity>,
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
    @Inject(forwardRef(() => MillComponentsService))
    private readonly millComponentsService: MillComponentsService,
    private readonly dataSource: DataSource,
    private readonly formService: FormService,
  ) {}

  //function to create a new template
  public async createTemplate(
    body: TemplatesCreateDTO,
  ): Promise<Response<CreateTemplateInterface>> {
    const { createdBy, clientId, templateName, templateType, componentBody } =
      body;

    const data = {
      createdBy,
      clientId,
      templateName: templateName.toLowerCase().trim(),
      templateType,
    };

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.usersService.getUserById(createdBy);

      await this.clientsService.getClientById(clientId);

      const result: TemplatesEntity = await queryRunner.manager.save(
        TemplatesEntity,
        data,
      );

      if (templateType === TemplateTypesEnum.TEMPERATURAS_BRONCES) {
        const newMillComponents: MillComponentsInterface[] = componentBody?.map(
          (component: MillComponentsInterface) => ({
            ...component,
            templateId: result?.id,
          }),
        );

        await this.millComponentsService.createMillComponent(
          newMillComponents,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      const response: Response<TemplatesEntity> = {
        statusCode: HttpStatus.CREATED,
        message: 'Template has been created successfully',
      };

      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error creating a new template: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    } finally {
      await queryRunner.release();
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
        order: { millComponents: { millName: 'ASC', tandemNumber: 'ASC' } },
        relations: ['client', 'user', 'millComponents'],
        select: {
          id: true,
          clientId: true,
          templateName: true,
          createdBy: true,
          client: { clientName: true },
          user: { fullName: true },
          millComponents: {
            id: true,
            componentName: true,
            millName: true,
            tandemNumber: true,
          },
        },
      });

      if (!template) {
        throw ErrorManager.createCustomError(
          `Template with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const componentOrder = filterComponents(template?.millComponents);

      const { millComponents, ...rest } = template;

      const templateWithOrderComponents = {
        ...rest,
        millComponents: componentOrder,
      };

      const response: Response<TemplatesEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Template found successfully',
        data: templateWithOrderComponents,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a template by id: ${error}`);
      throw error;
    }
  }

  //function to get all templates by ClientId
  public async getTemplatesByClientId(
    clientId: string,
  ): Promise<Response<FormattedFormInterface[]>> {
    try {
      const templates: FormattedFormInterface[] =
        await this.templatesRepository.find({
          where: { clientId },
          select: {
            id: true,
            clientId: true,
            templateName: true,
            createdBy: true,
            updatedAt: true,
            createdAt: true,
            status: true,
            templateType: true,
          },
        });

      const { data }: Response<FormattedFormInterface[]> =
        await this.formService.getFormByClientId(clientId);

      if (data.length === 0 && templates.length === 0) {
        throw ErrorManager.createCustomError(
          `No se encontraron formatos para el cliente: ${clientId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      templates.push(...data);

      const response: Response<FormattedFormInterface[]> = {
        statusCode: HttpStatus.OK,
        message: 'Templates found successfully',
        data: templates,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting templates by client id: ${error}`);
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
