import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const corsOptions: cors.CorsOptions = {
      origin: ['*'], 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, 
    };
    app.enableCors(corsOptions);
  await app.listen(3313);
  // hello
}
bootstrap();

