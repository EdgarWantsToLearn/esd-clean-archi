import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Logger
  const logger = new Logger('Bootstrap');

  // Set global prefix
  app.setGlobalPrefix('api', { exclude: ['/'] });

  // Enable CORS with options
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Use global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  // Use global interceptors (optional, can be uncommented if needed)
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}

bootstrap();
