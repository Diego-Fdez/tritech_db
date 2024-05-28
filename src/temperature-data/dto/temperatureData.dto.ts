import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TemperatureDataCreateDTO {
  @IsNotEmpty()
  @IsString()
  millComponentId: string;

  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsString()
  details: string;
}

export class TemperatureDataUpdateDTO {
  @IsOptional()
  @IsString()
  millComponentId: string;

  @IsOptional()
  @IsNumber()
  temperature: number;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsOptional()
  @IsString()
  details: string;
}
