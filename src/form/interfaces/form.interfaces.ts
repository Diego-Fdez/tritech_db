import { TemplateTypesEnum } from 'src/templates/interfaces';

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

export interface FormattedFormInterface {
  id: string;
  clientId: string;
  templateName: string;
  createdBy: string;
  status: string;
  templateType: TemplateTypesEnum;
  createdAt: Date;
  updatedAt: Date;
}
