import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setContact(
      'Smart Idea',
      'https://smartidea.me/',
      'pedrohematos@outlook.com',
    )
    .setTitle('Hubspot Blip API')
    .setDescription('Intermediate API for integration between Blip and Hobspot')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization', // name of the key expected in header
        in: 'header',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  );

  await app.listen(process.env.PORT);

  logger.log(
    `Application running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`,
  );
}

bootstrap();
