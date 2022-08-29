import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [ConfigModule],

  controllers: [ContactsController],

  providers: [ContactsService],
})
export class ContactsModule {}
