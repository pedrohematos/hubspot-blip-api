import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('homolog', 'development', 'production')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
        APP_KEY: Joi.string().required(),
        HUBSPOT_ACCESS_TOKEN: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
