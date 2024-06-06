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
  public async createSugarCaneMill(@Body() body: SugarCaneMillsCreateDTO[]) {
    return await this.sugarCaneMillsService.createSugarCaneMills(body);
  }

  //function to get all sugar cane mills
  @Roles('BASIC')
  @Get()
  public async getAllSugarCaneMills() {
    return await this.sugarCaneMillsService.getAllSugarCaneMills();
  }

  //function to get a sugar cane mill by ID
  @Roles('BASIC')
  @Get('/id/:id')
  public async getSugarCaneMillById(@Param('id') id: string) {
    return await this.sugarCaneMillsService.getSugarCaneMillsById(id);
  }

  //function to get a sugar cane mill by name
  @Roles('BASIC')
  @Get('/:name')
  public async getSugarCaneMillByName(@Param('name') name: string) {
    return await this.sugarCaneMillsService.getSugarCaneMillsByName(name);
  }

  //function to update a sugar cane mill by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Patch('/:id')
  public async updateSugarCaneMillById(
    @Param('id') id: string,
    @Body() body: SugarCaneMillsUpdateDTO,
  ) {
    return await this.sugarCaneMillsService.updateSugarCaneMillsById(id, body);
  }

  //function to eliminate a sugar cane mill by ID
  @UseGuards(OwnershipGuard)
  @Roles('BASIC')
  @Delete('/:id')
  public async deleteSugarCaneMillById(@Param('id') id: string) {
    return await this.sugarCaneMillsService.deleteSugarCaneMillsById(id);
  }
}
