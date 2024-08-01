export interface FormInterface {
  title: string;
  description?: string;
  clientId: string;
  createdById: string;
  status: FormStatus;
}

export enum FormStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
