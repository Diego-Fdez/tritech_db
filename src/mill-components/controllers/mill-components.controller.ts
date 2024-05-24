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
import { MillComponentsService } from '../services/mill-components.service';
import { Roles } from '../../auth/decorators';
import { MillComponentsCreateDTO, MillComponentsUpdateDTO } from '../dto';

@Controller('mill-components')
@UseGuards(AuthGuard, RolesGuard)
export class MillComponentsController {
  constructor(private readonly millComponentsService: MillComponentsService) {}

  //function to create a new millComponent
  @Roles('BASIC')
  @Post()
  public async createMillComponent(@Body() body: MillComponentsCreateDTO) {
    return await this.millComponentsService.createMillComponent(body);
  }

  //function to get all millComponents
  @Roles('BASIC')
  @Get()
  public async getAllMillComponents() {
    return await this.millComponentsService.getMillComponents();
  }

  //function to get a millComponent by ID
  @Roles('BASIC')
  @Get('/:id')
  public async getMillComponentById(@Param('id') id: string) {
    return await this.millComponentsService.getMillComponentById(id);
  }

  //function to update a millComponent by ID
  @Roles('BASIC')
  @Patch('/:id')
  public async updateMillComponentById(
    @Param('id') id: string,
    @Body() body: MillComponentsUpdateDTO,
  ) {
    return await this.millComponentsService.updateMillComponentById(id, body);
  }

  //function to eliminate a millComponent by ID
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteMillComponentById(@Param('id') id: string) {
    return await this.millComponentsService.deleteMillComponentById(id);
  }
}
