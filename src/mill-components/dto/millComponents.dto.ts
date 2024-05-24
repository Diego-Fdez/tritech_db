import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MillComponentsType, MillComponentsName } from '../interfaces';

export class MillComponentsCreateDTO {
  @IsNotEmpty()
  @IsString()
  sugarCaneMillId: string;

  @IsNotEmpty()
  @IsEnum(MillComponentsType)
  millComponentType: MillComponentsType;

  @IsNotEmpty()
  @IsEnum(MillComponentsName)
  millComponentName: MillComponentsName;
}

export class MillComponentsUpdateDTO {
  @IsOptional()
  @IsString()
  sugarCaneMillId: string;

  @IsOptional()
  @IsEnum(MillComponentsType)
  millComponentType: MillComponentsType;

  @IsOptional()
  @IsEnum(MillComponentsName)
  millComponentName: MillComponentsName;
}
