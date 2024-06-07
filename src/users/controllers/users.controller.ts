import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
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
  public async registerUser(@Body() body: UserCreateDTO, @Response() res: Res) {
    try {
      const newUser = await this.usersService.createUser(body);

      res.send(newUser);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a user by email
  @Roles('BASIC')
  @Get('/:email')
  public async getUserByEmail(
    @Param('email', EmailValidationPipe) email: string,
    @Response() res: Res,
  ) {
    try {
      const user = await this.usersService.getUserByEmail(email);

      res.send(user);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get all users
  @Roles('ADMIN')
  @Get()
  public async getAllUsers(@Response() res: Res) {
    try {
      const users = await this.usersService.getAllUsers();

      res.send(users);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to get a user by id
  @Roles('BASIC')
  @Get('/id/:id')
  public async getUserById(@Param('id') id: string, @Response() res: Res) {
    try {
      const user = await this.usersService.getUserById(id);

      res.send(user);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to update a user by id
  @Roles('BASIC')
  @Patch('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
    @Response() res: Res,
  ) {
    try {
      const user = await this.usersService.updateUserById(id, body);

      res.send(user);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }

  //function to delete a user by id
  @Roles('CREATOR')
  @Delete('/:id')
  public async deleteUser(@Param('id') id: string, @Response() res: Res) {
    try {
      const deletedUser = await this.usersService.deleteUserById(id);

      res.send(deletedUser);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
