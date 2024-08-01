export interface QuestionInterface {
  typeQuestion: string;
  textQuestion: string;
  order: number;
  formId: string;
  status: QuestionStatus;
}

export enum QuestionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
