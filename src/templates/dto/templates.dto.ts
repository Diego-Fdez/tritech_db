import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MillComponentsUpdateDTO } from '../../mill-components/dto';

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
  componentBody: [MillComponentsUpdateDTO];
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
  componentBody: [MillComponentsUpdateDTO];
}
