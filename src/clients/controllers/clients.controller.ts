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
  Query,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AuthGuard, RolesGuard } from '../../auth/guards';
import { ClientsService } from '../services/clients.service';
import { Roles } from '../../auth/decorators';
import { ClientsCreateDTO, ClientsUpdateDTO } from '../dto';

@Controller('clients')
@UseGuards(AuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  //function to create a new client
  @Roles('ADMIN')
  @Post()
  public async createClient(
    @Body() body: ClientsCreateDTO,
    @Response() res: Res,
  ) {
    try {
      const newClient = await this.clientService.createClient(body);

      res.send(newClient);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get all clients
  @Roles('BASIC')
  @Get()
  public async getAllClients(
    @Query('userId') userId: string,
    @Response() res: Res,
  ) {
    try {
      const clients = await this.clientService.getAllClients(userId);

      res.send(clients);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a client by id
  @Roles('BASIC')
  @Get('/id/:id')
  public async getClientById(@Param('id') id: string, @Response() res: Res) {
    try {
      const client = await this.clientService.getClientById(id);

      res.send(client);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a client by name
  @Roles('BASIC')
  @Get('/:name')
  public async getClientByName(
    @Param('name') clientName: string,
    @Query('userId') userId: string,
    @Response() res: Res,
  ) {
    try {
      const client = await this.clientService.getClientByName(
        clientName,
        userId,
      );

      res.send(client);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to update a client by ID
  @Roles('ADMIN')
  @Patch('/:id')
  public async updateClientById(
    @Param('id') id: string,
    @Body() body: ClientsUpdateDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedClient = await this.clientService.updateClientById(id, body);

      res.send(updatedClient);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to delete a client by ID
  @Roles('ADMIN')
  @Delete('/:id')
  public async deleteClientById(@Param('id') id: string, @Response() res: Res) {
    try {
      const deletedClient = await this.clientService.deleteClientById(id);

      res.send(deletedClient);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
