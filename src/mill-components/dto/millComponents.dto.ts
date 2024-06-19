import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MillName, MillComponentsName } from '../interfaces';

export class MillComponentsCreateDTO {
  @IsNotEmpty()
  @IsString()
  templateId: string;

  @IsNotEmpty()
  @IsEnum(MillName)
  millName: MillName;

  @IsNotEmpty()
  @IsNumber()
  tandemNumber: number;

  @IsNotEmpty()
  @IsEnum(MillComponentsName)
  componentName: MillComponentsName;
}

export class MillComponentsUpdateDTO {
  @IsOptional()
  @IsString()
  templateId: string;

  @IsOptional()
  @IsEnum(MillName)
  millName: MillName;

  @IsOptional()
  @IsNumber()
  tandemNumber: number;

  @IsOptional()
  @IsEnum(MillComponentsName)
  componentName: MillComponentsName;
}
