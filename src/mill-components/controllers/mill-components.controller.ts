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
  public async createMillComponent(
    @Body() body: MillComponentsCreateDTO,
    @Response() res: Res,
  ) {
    try {
      const newMillComponent =
        await this.millComponentsService.createMillComponent(body);

      res.send(newMillComponent);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get all millComponents
  @Roles('BASIC')
  @Get()
  public async getAllMillComponents(@Response() res: Res) {
    try {
      const millComponents =
        await this.millComponentsService.getMillComponents();

      res.send(millComponents);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a millComponent by ID
  @Roles('BASIC')
  @Get('/:id')
  public async getMillComponentById(
    @Param('id') id: string,
    @Response() res: Res,
  ) {
    try {
      const millComponent =
        await this.millComponentsService.getMillComponentById(id);

      res.send(millComponent);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to update a millComponent by ID
  @Roles('BASIC')
  @Patch('/:id')
  public async updateMillComponentById(
    @Param('id') id: string,
    @Body() body: MillComponentsUpdateDTO,
    @Response() res: Res,
  ) {
    try {
      const updatedMillComponent =
        await this.millComponentsService.updateMillComponentById(id, body);

      res.send(updatedMillComponent);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to eliminate a millComponent by ID
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteMillComponentById(
    @Param('id') id: string,
    @Response() res: Res,
  ) {
    try {
      const deletedMillComponent =
        await this.millComponentsService.deleteMillComponentById(id);

      res.send(deletedMillComponent);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
