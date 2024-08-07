import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, Not } from 'typeorm';
import { ClientsCreateDTO, ClientsUpdateDTO } from '../dto';
import { ErrorManager, Response } from '../../utils';
import { ClientsEntity } from '../entities/clients.entity';
import { ROLES } from '../../constants';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientRepository: Repository<ClientsEntity>,
    private readonly userService: UsersService,
  ) {}

  //function to create a new client
  public async createClient(body: ClientsCreateDTO): Promise<Response<any>> {
    try {
      await this.clientRepository.save(body);

      const response: Response<any> = {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente creado satisfactoriamente',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new client: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get all clients
  public async getAllClients(
    userId: string,
  ): Promise<Response<ClientsEntity[]>> {
    let clients: ClientsEntity[];

    try {
      const user = await this.userService.getUserById(userId);

      if (!user?.data) {
        throw ErrorManager.createCustomError(
          `El usuario con ID: ${userId} no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      //if user is basic, only get clients from the same country
      if (user?.data?.role === ROLES.BASIC) {
        clients = await this.clientRepository.find({
          where: {
            country: user?.data?.country,
          },
          order: {
            clientName: 'ASC',
          },
        });
      } else {
        const countryClients = await this.clientRepository.find({
          where: {
            country: user?.data?.country,
          },
          order: {
            clientName: 'ASC',
          },
        });

        const otherClients = await this.clientRepository.findBy({
          country: Not(user?.data?.country),
        });

        clients = [...countryClients, ...otherClients];
      }

      if (clients.length === 0) {
        throw ErrorManager.createCustomError(
          'No hay clientes registrados',
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
          `No encontramos el cliente con el ID: ${id}.`,
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
    userId: string,
  ): Promise<Response<ClientsEntity[]>> {
    let client: ClientsEntity[];

    try {
      const user = await this.userService.getUserById(userId);

      if (!user?.data) {
        throw ErrorManager.createCustomError(
          `El usuario con ID: ${userId} no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      //if user is basic, only get clients from the same country
      if (user?.data?.role === ROLES.BASIC) {
        client = await this.clientRepository.find({
          where: {
            clientName: ILike(`%${clientName}%`),
            country: user?.data?.country,
          },
        });
      } else {
        client = await this.clientRepository.find({
          where: {
            clientName: ILike(`%${clientName}%`),
          },
        });
      }

      if (!client) {
        throw ErrorManager.createCustomError(
          `No encontramos clientes con el nombre: ${clientName}.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<ClientsEntity[]> = {
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
          `Cliente con el ID: ${id}, no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const client = await this.clientRepository.findOneBy({ id });

      const response: Response<ClientsEntity> = {
        statusCode: HttpStatus.OK,
        message: 'Cliente actualizado correctamente',
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
          `Cliente con el ID: ${id}, no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Cliente eliminado',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a client by id: ${error}`);
      throw error;
    }
  }
}
