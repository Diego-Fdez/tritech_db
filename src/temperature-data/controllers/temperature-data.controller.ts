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
import { TemperatureDataService } from '../services/temperature-data.service';
import { AuthGuard, OwnershipGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../auth/decorators';
import { TemperatureDataCreateDTO, TemperatureDataUpdateDTO } from '../dto';

@Controller('temperature-data')
@UseGuards(AuthGuard, RolesGuard)
export class TemperatureDataController {
  constructor(
    private readonly temperatureDataService: TemperatureDataService,
  ) {}

  //function to create a new temperature data
  @Roles('BASIC')
  @Post()
  public async createTemperatureData(@Body() body: TemperatureDataCreateDTO) {
    return await this.temperatureDataService.createTemperatureData(body);
  }

  //function to get all temperature data
  @Roles('BASIC')
  @Get()
  public async getAllTemperatureData() {
    return await this.temperatureDataService.getTemperatureData();
  }

  //function to get a temperature data by ID
  @Roles('BASIC')
  @Get('/:id')
  public async getTemperatureDataById(@Param('id') id: string) {
    return await this.temperatureDataService.getTemperatureDataById(id);
  }

  //function to update a temperature data by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Patch('/:id')
  public async updateTemperatureDataById(
    @Param('id') id: string,
    @Body() body: TemperatureDataUpdateDTO,
  ) {
    return await this.temperatureDataService.updateTemperatureData(id, body);
  }

  //function to delete a temperature data by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteTemperatureDataById(@Param('id') id: string) {
    return await this.temperatureDataService.deleteTemperatureDataById(id);
  }
}
