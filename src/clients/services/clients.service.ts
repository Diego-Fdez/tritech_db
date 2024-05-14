import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsCreateDTO, ClientsUpdateDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { ClientsEntity } from '../entities/clients.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientRepository: Repository<ClientsEntity>,
  ) {}

  //function to create a new client
  public async createClient(body: ClientsCreateDTO): Promise<Response<any>> {
    try {
      await this.clientRepository.save(body);

      const response: Response<any> = {
        statusCode: HttpStatus.CREATED,
        message: 'Client has been created successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new client: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get all clients
  public async getAllClients(): Promise<Response<ClientsEntity[]>> {
    try {
      const clients: ClientsEntity[] = await this.clientRepository.find();

      if (clients.length === 0) {
        throw ErrorManager.createCustomError(
          'No clients found',
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<ClientsEntity[]> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: clients,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting all clients: ${error}`);
      throw error;
    }
  }

  //function to get a client by id, if not found, throw an error
  public async getClientById(id: string): Promise<Response<ClientsEntity>> {
    try {
      const client: ClientsEntity = await this.clientRepository.findOneBy({
        id,
      });

      if (!client) {
        throw ErrorManager.createCustomError(
          `Client with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<ClientsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: client,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a client by id: ${error}`);
      throw error;
    }
  }

  //function to get a client by name
  public async getClientByName(
    clientName: string,
  ): Promise<Response<ClientsEntity>> {
    try {
      const client: ClientsEntity = await this.clientRepository.findOneBy({
        clientName,
      });

      if (!client) {
        throw ErrorManager.createCustomError(
          `Client with name: ${clientName} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<ClientsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: client,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a client by name: ${error}`);
      throw error;
    }
  }

  //function to update a client by id, if not found, throw an error
  public async updateClientById(
    id: string,
    body: ClientsUpdateDTO,
  ): Promise<Response<ClientsEntity>> {
    try {
      const clientUpdated = await this.clientRepository.update(id, body);

      if (clientUpdated?.affected === 0) {
        throw ErrorManager.createCustomError(
          `Client with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const client = await this.clientRepository.findOneBy({ id });

      const response: Response<ClientsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Client has been updated successfully',
        data: client,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating a client by id: ${error}`);
      throw error;
    }
  }

  //function to delete a client by id, if not found, throw an error
  public async deleteClientById(id: string): Promise<Response<any>> {
    try {
      const clientDeleted = await this.clientRepository.delete(id);

      if (clientDeleted?.affected === 0) {
        throw ErrorManager.createCustomError(
          `Client with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Client deleted',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a client by id: ${error}`);
      throw error;
    }
  }
}
