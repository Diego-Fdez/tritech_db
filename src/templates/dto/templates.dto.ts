import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TemplateTypesEnum } from '../interfaces';

export class TemplatesCreateDTO {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  templateName: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsArray()
  @IsNotEmpty()
  componentBody: object[];

  @IsEnum(TemplateTypesEnum)
  @IsNotEmpty()
  templateType: TemplateTypesEnum;
}

export class TemplatesUpdateDTO {
  @IsOptional()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  templateName: string;

  @IsOptional()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsArray()
  @IsOptional()
  componentBody: object[];

  @IsEnum(TemplateTypesEnum)
  @IsOptional()
  templateType: TemplateTypesEnum;
}
