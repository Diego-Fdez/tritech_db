import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswerOptionsDTO {
  @IsNotEmpty()
  @IsString()
  optionText: string;

  @IsString()
  @IsOptional()
  questionId: string;
}

export class UpdateAnswerOptionsDTO {
  @IsString()
  @IsOptional()
  optionText: string;
}
