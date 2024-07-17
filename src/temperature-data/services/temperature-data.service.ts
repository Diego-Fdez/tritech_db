import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureDataEntity } from '../entities/temperatureData.entity';
import { TemperatureDataCreateDTO, TemperatureDataUpdateDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { MillComponentsService } from '../../mill-components/services/mill-components.service';
import { TemperaturesSuccessResponseInterface } from '../interfaces';

@Injectable()
export class TemperatureDataService {
  private readonly logger = new Logger(TemperatureDataService.name);
  constructor(
    @InjectRepository(TemperatureDataEntity)
    private readonly temperatureDataRepository: Repository<TemperatureDataEntity>,
    private readonly millComponentsService: MillComponentsService,
  ) {}

  //function to create a new temperatureData
  public async createTemperatureData(
    body: TemperatureDataCreateDTO[],
  ): Promise<Response<TemperaturesSuccessResponseInterface>> {
    try {
      await this.millComponentsService.getMillComponentById(
        body[0].millComponentId,
      );

      const temperaturesResponse: TemperatureDataEntity[] =
        await this.temperatureDataRepository.save(body);

      const temperaturesId: string = temperaturesResponse[0]?.id;

      const response: Response<TemperaturesSuccessResponseInterface> = {
        statusCode: HttpStatus.CREATED,
        message: 'Temperature Data created successfully',
        data: { id: temperaturesId },
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new temperature data: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get all temperatureData
  public async getTemperatureData(): Promise<
    Response<TemperatureDataEntity[]>
  > {
    try {
      const temperatureData: TemperatureDataEntity[] =
        await this.temperatureDataRepository.find();

      if (temperatureData?.length === 0) {
        throw ErrorManager.createCustomError(
          'No temperature data found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<TemperatureDataEntity[]> = {
        statusCode: HttpStatus.OK,
        message: 'Temperature data found successfully',
        data: temperatureData,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting temperature data: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get a temperatureData by id, if not found, throw an error
  public async getTemperatureDataById(
    id: string,
  ): Promise<Response<TemperatureDataEntity>> {
    try {
      const temperatureData: TemperatureDataEntity =
        await this.temperatureDataRepository.findOneBy({ id });

      if (!temperatureData) {
        throw ErrorManager.createCustomError(
          'Temperature data not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<TemperatureDataEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Temperature data found successfully',
        data: temperatureData,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting temperature data by id: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to delete a temperatureData by id, if not found, throw an error
  public async deleteTemperatureDataById(id: string): Promise<Response<any>> {
    try {
      const temperatureDataDeleted =
        await this.temperatureDataRepository.delete(id);

      if (temperatureDataDeleted.affected === 0) {
        throw ErrorManager.createCustomError(
          'Temperature data not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Temperature data deleted successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting temperature data by id: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to update a temperatureData by id, if not found, throw an error
  public async updateTemperatureData(
    id: string,
    body: TemperatureDataUpdateDTO,
  ): Promise<Response<TemperatureDataEntity>> {
    try {
      if (body?.millComponentId) {
        await this.millComponentsService.getMillComponentById(
          body?.millComponentId,
        );
      }

      const temperatureDataUpdated =
        await this.temperatureDataRepository.update(id, body);

      if (temperatureDataUpdated.affected === 0) {
        throw ErrorManager.createCustomError(
          'Temperature data not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<TemperatureDataEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Temperature data updated successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating temperature data by id: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
