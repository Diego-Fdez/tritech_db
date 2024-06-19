import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
