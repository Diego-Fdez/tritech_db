import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../entities/users.entity';
import { UserCreateDTO, UserUpdateDTO } from '../dto';
import { ErrorManager } from '../../utils/error.manager';
import { Response } from 'src/utils';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  //function to create a new user
  public async createUser(body: UserCreateDTO): Promise<Response<any>> {
    try {
      //hash password with bcrypt
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      await this.userRepository.save(body);

      const response: Response<any> = {
        statusCode: HttpStatus.CREATED,
        message: 'User has been created successfully',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error creating a new user: ${error}`);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //function to get a user by email, if not found, throw an error
  public async getUserByEmail(email: string): Promise<Response<UsersEntity>> {
    try {
      const user: UsersEntity = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw ErrorManager.createCustomError(
          `User with email: ${email} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: user,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error to find user with email ${email}: ${error}`);
      throw error;
    }
  }

  //function to get all users
  public async getAllUsers(): Promise<Response<UsersEntity[]>> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw ErrorManager.createCustomError(
          'No users found',
          HttpStatus.NOT_FOUND,
        );
      }

      const res: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: users,
      };

      return res;
    } catch (error) {
      this.logger.error(`Error to get all users: ${error}`);
      throw error;
    }
  }

  //function to get a user by id, if not found, throw an error
  public async getUserById(id: string): Promise<Response<UsersEntity>> {
    try {
      const user: UsersEntity = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw ErrorManager.createCustomError(
          `User with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: user,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error getting a user by ID: ${error}`);
      throw error;
    }
  }

  //function to update a user by id, if not found, throw an error
  public async updateUserById(
    id: string,
    body: UserUpdateDTO,
  ): Promise<Response<UsersEntity>> {
    try {
      const userUpdated = await this.userRepository.update(id, body);

      if (userUpdated?.affected === 0) {
        throw ErrorManager.createCustomError(
          `User with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const user: UsersEntity = await this.userRepository.findOneBy({ id });

      const response: Response<any> = {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: user,
      };

      return response;
    } catch (error) {
      this.logger.error(`Error updating user: ${error}`);
      throw error;
    }
  }

  //function to delete a user by id, if not found, throw an error
  public async deleteUserById(id: string): Promise<Response<any>> {
    try {
      const user = await this.userRepository.delete({ id });

      if (user?.affected === 0) {
        throw ErrorManager.createCustomError(
          `User with id: ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const response: Response<any> = {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'User deleted',
      };

      return response;
    } catch (error) {
      this.logger.error(`Error deleting a user: ${error}`);
      throw error;
    }
  }
}
