export interface AnswerInterface {
  answerValue: string;
  questionId: string;
  status: AnswerStatus;
}

export enum AnswerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
