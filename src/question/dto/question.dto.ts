import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateQuestionDTO {
  @IsNotEmpty()
  @IsString()
  typeQuestion: string;

  @IsNotEmpty()
  @IsString()
  textQuestion: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsString()
  formId?: string;
}
