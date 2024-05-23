import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SugarCaneMillsEntity } from '../entities/sugarCaneMills.entity';
import {
  SugarCaneMillsCreateDTO,
  SugarCaneMillsUpdateDTO,
} from '../dto/sugarCaneMills.dto';
import { ErrorManager, Response } from '../../utils';

@Injectable()
export class SugarCaneMillsService {
  private readonly logger = new Logger(SugarCaneMillsService.name);
  constructor(
    @InjectRepository(SugarCaneMillsEntity)
    private readonly sugarCaneMillsRepository: Repository<SugarCaneMillsEntity>,
  ) {}

  //function to create a new sugarCaneMills
  public async createSugarCaneMills(
    body: SugarCaneMillsCreateDTO,
  ): Promise<Response<SugarCaneMillsEntity>> {
    try {
      await this.sugarCaneMillsRepository.save(body);

      const response: Response<SugarCaneMillsEntity> = {
        statusCode: HttpStatus.CREATED,
        message: 'SugarCaneMills created successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new sugar cane mill: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get all sugarCaneMills
  public async getAllSugarCaneMills(): Promise<
    Response<SugarCaneMillsEntity[]>
  > {
    try {
      const sugarCaneMills: SugarCaneMillsEntity[] =
        await this.sugarCaneMillsRepository.find();

      if (sugarCaneMills?.length === 0) {
        throw ErrorManager.createCustomError(
          'No sugar cane mills found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<SugarCaneMillsEntity[]> = {
        statusCode: HttpStatus.OK,
        message: 'SugarCaneMills found successfully',
        data: sugarCaneMills,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting all sugar cane mills: ${error}`);
      throw error;
    }
  }

  //function to get a sugarCaneMills by id, if not found, throw an error
  public async getSugarCaneMillsById(
    id: string,
  ): Promise<Response<SugarCaneMillsEntity>> {
    try {
      const sugarCaneMills: SugarCaneMillsEntity =
        await this.sugarCaneMillsRepository.findOneBy({ id });

      if (!sugarCaneMills) {
        throw ErrorManager.createCustomError(
          `SugarCaneMills with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<SugarCaneMillsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'SugarCaneMills found successfully',
        data: sugarCaneMills,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a sugar cane mill by id: ${error}`);
      throw error;
    }
  }

  //function to get a sugarCaneMills by name, if not found, throw an error
  public async getSugarCaneMillsByName(
    millName: string,
  ): Promise<Response<SugarCaneMillsEntity>> {
    try {
      const sugarCaneMills: SugarCaneMillsEntity =
        await this.sugarCaneMillsRepository.findOneBy({ millName });

      if (!sugarCaneMills) {
        throw ErrorManager.createCustomError(
          `SugarCaneMills with name: ${millName} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<SugarCaneMillsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'SugarCaneMills found successfully',
        data: sugarCaneMills,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a sugar cane mill by name: ${error}`);
      throw error;
    }
  }

  //function to update a sugarCaneMills by id, if not found, throw an error
  public async updateSugarCaneMillsById(
    id: string,
    body: SugarCaneMillsUpdateDTO,
  ): Promise<Response<SugarCaneMillsEntity>> {
    try {
      const sugarCaneMillsUpdated = await this.sugarCaneMillsRepository.update(
        id,
        body,
      );

      if (sugarCaneMillsUpdated?.affected === 0) {
        throw ErrorManager.createCustomError(
          `SugarCaneMills with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const sugarCaneMills: SugarCaneMillsEntity =
        await this.sugarCaneMillsRepository.findOneBy({ id });

      const response: Response<SugarCaneMillsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'SugarCaneMills updated successfully',
        data: sugarCaneMills,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating a sugar cane mill by id: ${error}`);
      throw error;
    }
  }

  //function to delete a sugarCaneMills by id, if not found, throw an error
  public async deleteSugarCaneMillsById(id: string): Promise<Response<any>> {
    try {
      const sugarCaneMills = await this.sugarCaneMillsRepository.delete(id);

      if (sugarCaneMills?.affected === 0) {
        throw ErrorManager.createCustomError(
          `SugarCaneMills with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'SugarCaneMills deleted successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a sugar cane mill by id: ${error}`);
      throw error;
    }
  }
}
