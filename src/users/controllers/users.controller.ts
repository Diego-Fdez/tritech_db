import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserCreateDTO, UserUpdateDTO } from '../dto';
import { EmailValidationPipe } from '../../utils';
import { AuthGuard, RolesGuard } from '../../auth/guards';
import { PublicAccess, Roles } from '../../auth/decorators';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //method to register a user
  @PublicAccess()
  @Post()
  public async registerUser(@Body() body: UserCreateDTO) {
    return await this.usersService.createUser(body);
  }

  //function to get a user by email
  @Roles('BASIC')
  @Get('/:email')
  public async getUserByEmail(
    @Param('email', EmailValidationPipe) email: string,
  ) {
    return await this.usersService.getUserByEmail(email);
  }

  //function to get all users
  @Roles('ADMIN')
  @Get()
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  //function to get a user by id
  @Roles('BASIC')
  @Get('/id/:id')
  public async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  //function to update a user by id
  @Roles('BASIC')
  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUserById(id, body);
  }

  //function to delete a user by id
  @Roles('CREATOR')
  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUserById(id);
  }
}
