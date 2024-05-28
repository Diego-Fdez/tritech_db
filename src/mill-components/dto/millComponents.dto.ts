import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MillComponentsType, MillComponentsName } from '../interfaces';

export class MillComponentsCreateDTO {
  @IsNotEmpty()
  @IsString()
  sugarCaneMillId: string;

  @IsNotEmpty()
  @IsEnum(MillComponentsType)
  componentType: MillComponentsType;

  @IsNotEmpty()
  @IsEnum(MillComponentsName)
  componentName: MillComponentsName;
}

export class MillComponentsUpdateDTO {
  @IsOptional()
  @IsString()
  sugarCaneMillId: string;

  @IsOptional()
  @IsEnum(MillComponentsType)
  componentType: MillComponentsType;

  @IsOptional()
  @IsEnum(MillComponentsName)
  componentName: MillComponentsName;
}
