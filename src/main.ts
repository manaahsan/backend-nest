import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as  session from  'express-session'
import * as passport from "passport"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Automatically converts plain objects
      },
    }),
  );
  app.use(session({
    name: 'session_id',
    secret: 'dsvhvvbghdvbdhbhbQJWILJUDGWE',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
