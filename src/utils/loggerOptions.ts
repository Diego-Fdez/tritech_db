import { Request, Response } from 'express';
import { CORRELATION_ID_HEADER } from '../correlation-id.middleware';

export const loggerOptions = {
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              messageKey: 'message',
            },
          }
        : undefined,
    messageKey: 'message',
    autoLogging: false,
    serializers: {
      req() {
        return undefined;
      },
      res() {
        return undefined;
      },
    },
    customProps: (req: Request, res: Response) => {
      return {
        correlationId: req[CORRELATION_ID_HEADER],
      };
    },
  },
};
