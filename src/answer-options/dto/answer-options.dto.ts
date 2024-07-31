import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswerOptionsDTO {
  @IsNotEmpty()
  @IsString()
  optionText: string;

  @IsString()
  @IsOptional()
  questionId: string;
}
