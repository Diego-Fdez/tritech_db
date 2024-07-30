import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TemperatureDataCreateDTO {
  @IsNotEmpty()
  @IsString()
  millComponentId: string;

  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsOptional()
  @IsString()
  temperatureId: string;
}

export class TemperatureDataUpdateDTO {
  @IsOptional()
  @IsString()
  millComponentId: string;

  @IsOptional()
  @IsNumber()
  temperature: number;

  @IsOptional()
  @IsString()
  temperatureId: string;
}
