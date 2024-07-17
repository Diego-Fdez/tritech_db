export interface TemperatureDataInterface {
  millComponentId: string;
  temperature: number;
  date: Date;
  details?: string;
  isSent: boolean;
}

export interface TemperaturesSuccessResponseInterface {
  id: string;
}
