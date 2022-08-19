import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { HeaderApiKeyGuard } from 'src/auth/auth-header-api-key.guard';
import { ContactsService } from './contacts.service';
import { CreateContactRequestBodyDTO } from './dtos/requests/create-contact-request-body.dto copy';
import { GetContactByEmailParam } from './dtos/requests/get-contact-by-email-request-param.dto';
import { UpdateContactByIdRequestBodyDTO } from './dtos/requests/update-contact-by-id-request-body.dto';
import { UpdateContactByIdParam } from './dtos/requests/update-contact-by-id-request-param.dto';
import { Contact } from './types/contact.type';

@ApiTags('Contacts')
@Controller('contact')
@ApiSecurity('Authorization')
@UseGuards(HeaderApiKeyGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':email')
  @ApiResponse({
    status: 200,
    type: Contact,
    description: 'Default response if the operation was successful',
  })
  @ApiResponse({
    status: 204,
    description: 'Contact not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    required: true,
    description: 'Contact email for search',
  })
  @ApiOperation({
    summary: 'Get contact by email',
    description: 'Get contact information by its email in Hubspot CRM',
  })
  async getContactByEmail(
    @Param() { email }: GetContactByEmailParam,
  ): Promise<Contact> {
    return await this.contactsService.getContactByEmail(email);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: Contact,
    description: 'Default response if the operation was successful',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Business logic violation',
  })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
  })
  @ApiBody({ type: CreateContactRequestBodyDTO })
  @ApiOperation({
    summary: 'Create a new contact',
    description: 'Create a new contact in Hubspot CRM',
  })
  async createContact(@Body() requestBody: CreateContactRequestBodyDTO) {
    return await this.contactsService.createContact(requestBody);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    type: Contact,
    description: 'Default response if the operation was successful',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Business logic violation',
  })
  @ApiResponse({
    status: 500,
    description: 'Server internal error',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Contact id for update',
  })
  @ApiBody({ type: UpdateContactByIdRequestBodyDTO })
  @ApiOperation({
    summary: 'Update a contact by its id',
    description: 'Update a contact by its Hubspot CRM id',
  })
  async updateContactById(
    @Param() { id }: UpdateContactByIdParam,
    @Body() requestBody: UpdateContactByIdRequestBodyDTO,
  ): Promise<Contact> {
    return await this.contactsService.updateContactById(id, requestBody);
  }
}
