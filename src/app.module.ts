import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('homolog', 'development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        API_KEY: Joi.string().required(),
        HUBSPOT_ACCESS_TOKEN: Joi.string().required(),
      }),
    }),

    AuthModule,
    ContactsModule,
  ],
})
export class AppModule {}
