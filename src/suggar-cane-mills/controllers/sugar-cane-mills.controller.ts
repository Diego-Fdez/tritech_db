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
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AuthGuard, OwnershipGuard, RolesGuard } from '../../auth/guards';
import { SugarCaneMillsService } from '../services/sugar-cane-mills.service';
import { Roles } from '../../auth/decorators';
import {
  SugarCaneMillsCreateDTO,
  SugarCaneMillsUpdateDTO,
} from '../dto/sugarCaneMills.dto';

@Controller('sugar-cane-mills')
@UseGuards(AuthGuard, RolesGuard)
export class SugarCaneMillsController {
  constructor(private readonly sugarCaneMillsService: SugarCaneMillsService) {}

  //function to create a new sugar cane mill
  @Roles('BASIC')
  @Post()
  public async createSugarCaneMill(
    @Body() body: SugarCaneMillsCreateDTO[],
    @Response() res: Res,
  ) {
    try {
      const newSugarCaneMill =
        await this.sugarCaneMillsService.createSugarCaneMills(body);

      res.send(newSugarCaneMill);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get all sugar cane mills
  @Roles('BASIC')
  @Get()
  public async getAllSugarCaneMills(@Response() res: Res) {
    try {
      const allSugarCaneMills =
        await this.sugarCaneMillsService.getAllSugarCaneMills();

      res.send(allSugarCaneMills);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a sugar cane mill by ID
  @Roles('BASIC')
  @Get('/id/:id')
  public async getSugarCaneMillById(
    @Param('id') id: string,
    @Response() res: Res,
  ) {
    try {
      const sugarCaneMill =
        await this.sugarCaneMillsService.getSugarCaneMillsById(id);

      res.send(sugarCaneMill);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a sugar cane mill by name
  @Roles('BASIC')
  @Get('/:name')
  public async getSugarCaneMillByName(
    @Param('name') name: string,
    @Response() res: Res,
  ) {
    try {
      const sugarCaneMill =
        await this.sugarCaneMillsService.getSugarCaneMillsByName(name);

      res.send(sugarCaneMill);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to update a sugar cane mill by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Patch('/:id')
  public async updateSugarCaneMillById(
    @Param('id') id: string,
    @Body() body: SugarCaneMillsUpdateDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedSugarCaneMill =
        await this.sugarCaneMillsService.updateSugarCaneMillsById(id, body);

      res.send(updatedSugarCaneMill);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to eliminate a sugar cane mill by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteSugarCaneMillById(
    @Param('id') id: string,
    @Response() res: Res,
  ) {
    try {
      const deletedSugarCaneMill =
        await this.sugarCaneMillsService.deleteSugarCaneMillsById(id);

      res.send(deletedSugarCaneMill);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
