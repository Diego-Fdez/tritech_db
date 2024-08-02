export interface AnswerOptionsInterface {
  optionText: string;
  questionId: string;
  status: AnswerOptionsStatus;
}

export enum AnswerOptionsStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
