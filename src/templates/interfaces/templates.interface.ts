export enum TemplateTypesEnum {
  TEMPERATURAS_BRONCES = 'TB',
  TEMPERATURAS_TRANSMISIONES = 'TT',
  INDICES_INGENIOS = 'II',
  CHECKLIST = 'CH',
}

export interface TemplatesInterface {
  clientId: string;
  templateName: string;
  createdBy: string;
  status: string;
  templateType: TemplateTypesEnum;
}

export interface CreateTemplateInterface {
  id: string;
}
