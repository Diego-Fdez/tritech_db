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
  public async createTemperatureData(
    @Body() body: TemperatureDataCreateDTO[],
    @Response() res: Res,
  ) {
    try {
      const newTemperatureData =
        await this.temperatureDataService.createTemperatureData(body);

      res.send(newTemperatureData);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get all temperature data
  @Roles('BASIC')
  @Get()
  public async getAllTemperatureData(@Response() res: Res) {
    try {
      const allTemperatureData =
        await this.temperatureDataService.getTemperatureData();

      res.send(allTemperatureData);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a temperature data by ID
  @Roles('BASIC')
  @Get('/:date')
  public async getTheLastTemperaturesDataByDate(
    @Param('date') date: string,
    @Query('templateId') templateId: string,
    @Response() res: Res,
  ) {
    try {
      const temperatureData =
        await this.temperatureDataService.getTheLastTemperaturesDataByDate(
          date,
          templateId,
        );
      res.send(temperatureData);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get temperatures by date range
  @Roles('BASIC')
  @Get('/templateId/:templateId')
  public async getTemperaturesByDateRange(
    @Param('templateId') templateId: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Response() res: Res,
  ) {
    try {
      const temperatureData =
        await this.temperatureDataService.getTemperatureDataByDateRange(
          startDate,
          endDate,
          templateId,
        );

      res.send(temperatureData);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to update a temperature data by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Patch('/:id')
  public async updateTemperatureDataById(
    @Param('id') id: string,
    @Body() body: TemperatureDataUpdateDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedTemperatureData =
        await this.temperatureDataService.updateTemperatureData(id, body);

      res.send(updatedTemperatureData);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to delete a temperature data by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteTemperatureDataById(
    @Param('id') id: string,
    @Response() res: Res,
  ) {
    try {
      const deletedTemperatureData =
        await this.temperatureDataService.deleteTemperatureDataById(id);

      res.send(deletedTemperatureData);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
