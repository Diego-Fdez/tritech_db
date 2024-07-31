import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerOptionsDTO } from 'src/answer-options/dto';

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerOptionsDTO)
  options: CreateAnswerOptionsDTO[];
}
