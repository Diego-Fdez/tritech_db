import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClientsCreateDTO {
  @IsNotEmpty()
  @IsString()
  clientName: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class ClientsUpdateDTO {
  @IsOptional()
  @IsString()
  clientName: string;

  @IsOptional()
  @IsString()
  country: string;
}
