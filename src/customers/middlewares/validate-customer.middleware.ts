import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (authorization) {
      next();
    } else {
      res.status(401).send({ error: 'unAuthorized' });
    }
  }
}
