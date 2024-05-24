import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TemperatureDataCreateDTO {
  @IsNotEmpty()
  @IsString()
  millComponentId: string;

  @IsNotEmpty()
  @IsString()
  temperature: number;

  @IsDateString()
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
  @IsString()
  temperature: number;

  @IsDateString()
  @IsOptional()
  date: Date;

  @IsOptional()
  @IsString()
  details: string;
}
