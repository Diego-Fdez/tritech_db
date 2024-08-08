import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponseDTO {
  @IsNotEmpty()
  @IsString()
  formId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
