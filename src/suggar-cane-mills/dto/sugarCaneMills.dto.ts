import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SugarCaneMillsCreateDTO {
  @IsNotEmpty()
  @IsString()
  millName: string;

  @IsNotEmpty()
  @IsString()
  templateId: string;

  @IsNotEmpty()
  @IsNumber()
  tandemCount: number;
}

export class SugarCaneMillsUpdateDTO {
  @IsOptional()
  @IsString()
  millName: string;

  @IsOptional()
  @IsString()
  templateId: string;

  @IsOptional()
  @IsNumber()
  tandemCount: number;
}
