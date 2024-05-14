import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationHeader = req.header(CORRELATION_ID_HEADER) || randomUUID();
    req.headers[CORRELATION_ID_HEADER] = correlationHeader;
    res.set(CORRELATION_ID_HEADER, correlationHeader);

    next();
  }
}
