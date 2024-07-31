import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import {
  CreateAnswerOptionsDTO,
  UpdateAnswerOptionsDTO,
} from 'src/answer-options/dto';

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

export class UpdateQuestionDTO {
  @IsOptional()
  @IsString()
  typeQuestion?: string;

  @IsOptional()
  @IsString()
  textQuestion?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsNotEmpty()
  @IsString()
  formId: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerOptionsDTO)
  options?: UpdateAnswerOptionsDTO[];
}
