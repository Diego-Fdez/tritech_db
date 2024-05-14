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
  public async createClient(@Body() body: ClientsCreateDTO) {
    return await this.clientService.createClient(body);
  }

  //function to get all clients
  @Roles('BASIC')
  @Get()
  public async getAllClients() {
    return await this.clientService.getAllClients();
  }

  //function to get a client by id
  @Roles('BASIC')
  @Get('/id/:id')
  public async getClientById(@Param('id') id: string) {
    return await this.clientService.getClientById(id);
  }

  //function to get a client by name
  @Roles('BASIC')
  @Get('/:name')
  public async getClientByName(@Param('name') clientName: string) {
    return await this.clientService.getClientByName(clientName);
  }

  //function to update a client by ID
  @Roles('ADMIN')
  @Patch('/:id')
  public async updateClientById(
    @Param('id') id: string,
    @Body() body: ClientsUpdateDTO,
  ) {
    return await this.clientService.updateClientById(id, body);
  }

  //function to delete a client by ID
  @Roles('ADMIN')
  @Delete('/:id')
  public async deleteClientById(@Param('id') id: string) {
    return await this.clientService.deleteClientById(id);
  }
}
