import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDTO {
  @IsNotEmpty()
  @IsString()
  answerValue: string;

  @IsOptional()
  @IsString()
  questionId: string;
}
