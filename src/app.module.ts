import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        API_ENV: Joi.string()
          .valid('homolog', 'development', 'production')
          .default('development'),
        API_PORT: Joi.number().default(3000),
        API_KEY: Joi.string().required(),
        HUBSPOT_ACCESS_TOKEN: Joi.string().required(),
      }),
    }),

    ContactsModule,
  ],
})
export class AppModule {}
