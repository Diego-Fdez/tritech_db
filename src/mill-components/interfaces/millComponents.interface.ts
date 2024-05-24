export enum MillComponentsType {
  BRONCE = 'Bronce',
  CORONA = 'Corona',
}

export enum MillComponentsName {
  BRONCE_4TA_MAZA_LT = 'Bronce 4ta maza LT',
  BRONCE_CANERA_LT = 'Bronce cañera LT',
  BRONCE_SUPERIOR_LT = 'Bronce superior LT',
  BRONCE_BAGACERA_LT = 'Bronce bagacera LT',
  BRONCE_4TA_MAZA_LS = 'Bronce 4ta maza LS',
  BRONCE_CANERA_LS = 'Bronce cañera LS',
  BRONCE_SUPERIOR_LS = 'Bronce superior LS',
  BRONCE_BAGACERA_LS = 'Bronce bagacera LS',
  CORONA_4TA_MAZA_LT = 'Corona 4ta maza LT',
  CORONA_CANERA_LT = 'Corona cañera LT',
  CORONA_SUPERIOR_LT = 'Corona superior LT',
  CORONA_BAGACERA_LT = 'Corona bagacera LT',
  CORONA_4TA_MAZA_LS = 'Corona 4ta maza LS',
  CORONA_CANERA_LS = 'Corona cañera LS',
  CORONA_SUPERIOR_LS = 'Corona superior LS',
  CORONA_BAGACERA_LS = 'Corona bagacera LS',
}

export interface MillComponentsInterface {
  sugarCaneMillId: string;
  componentType: MillComponentsType;
  componentName: MillComponentsName;
}
