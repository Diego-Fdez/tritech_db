import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class AnswerDTO {
  @IsNotEmpty()
  @IsString()
  answerValue: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}

export class CreateAnswerDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  answers: AnswerDTO[];
}

export class UpdateAnswerDTO {
  @IsNotEmpty()
  @IsString()
  answerValue?: string;
}
