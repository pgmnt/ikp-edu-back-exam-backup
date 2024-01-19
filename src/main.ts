import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist : true}))
  app.use(cookieParser());
  const corsOptions: cors.CorsOptions = {
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };
  app.enableCors(corsOptions);
  await app.listen(3313);
  
}
bootstrap();

