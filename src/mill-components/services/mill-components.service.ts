import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { MillComponentsEntity } from '../entities/millComponents.entity';
import { MillComponentsCreateDTO, MillComponentsUpdateDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { TemplatesService } from '../../templates/services/templates.service';

@Injectable()
export class MillComponentsService {
  private readonly logger = new Logger(MillComponentsService.name);
  constructor(
    @InjectRepository(MillComponentsEntity)
    private readonly millComponentsRepository: Repository<MillComponentsEntity>,
    @Inject(forwardRef(() => TemplatesService))
    private readonly templateService: TemplatesService,
  ) {}

  //function to create a new millComponent
  public async createMillComponent(
    body: MillComponentsCreateDTO[],
    queryRunner?: QueryRunner,
  ): Promise<Response<MillComponentsEntity>> {
    try {
      if (queryRunner) {
        await queryRunner.manager.save(MillComponentsEntity, body);
      } else {
        await this.templateService.getTemplateById(body[0]?.templateId);

        await this.millComponentsRepository.save(body);
      }

      const response: Response<MillComponentsEntity> = {
        statusCode: HttpStatus.CREATED,
        message: 'Molino creado satisfactoriamente',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new mill component: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get all millComponents
  public async getMillComponents(): Promise<Response<MillComponentsEntity[]>> {
    try {
      const millComponents: MillComponentsEntity[] =
        await this.millComponentsRepository.find();

      if (millComponents?.length === 0) {
        throw ErrorManager.createCustomError(
          'No hay molinos registrados.',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<MillComponentsEntity[]> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: millComponents,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting all mill components: ${error}`);
      throw error;
    }
  }

  //function to get a millComponent by id, if not found, throw an error
  public async getMillComponentById(
    id: string,
  ): Promise<Response<MillComponentsEntity>> {
    try {
      const millComponent: MillComponentsEntity =
        await this.millComponentsRepository.findOneBy({ id });

      if (!millComponent) {
        throw ErrorManager.createCustomError(
          `No se encontraron molinos con el ID: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<MillComponentsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: millComponent,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a mill component by id: ${error}`);
      throw error;
    }
  }

  //function to update a millComponent by id, if not found, throw an error
  public async updateMillComponentById(
    id: string,
    body: MillComponentsUpdateDTO,
  ): Promise<Response<MillComponentsEntity>> {
    try {
      await this.templateService.getTemplateById(body.templateId);

      const millComponentUpdated = await this.millComponentsRepository.update(
        id,
        body,
      );

      if (millComponentUpdated.affected === 0) {
        throw ErrorManager.createCustomError(
          `No se encontraron molinos con el ID: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<MillComponentsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Molino actualizado correctamente',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating a mill component by id: ${error}`);
      throw error;
    }
  }

  //function to delete a millComponent by id, if not found, throw an error
  public async deleteMillComponentById(id: string): Promise<Response<any>> {
    try {
      const millComponentDeleted = await this.millComponentsRepository.delete(
        id,
      );

      if (millComponentDeleted.affected === 0) {
        throw ErrorManager.createCustomError(
          `No se encontraron molinos con el ID: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Molino eliminado correctamente',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a mill component by id: ${error}`);
      throw error;
    }
  }
}
