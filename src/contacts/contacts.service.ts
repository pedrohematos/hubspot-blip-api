import * as hubspot from '@hubspot/api-client';
import {
  CollectionResponseWithTotalSimplePublicObjectForwardPaging,
  PublicObjectSearchRequest,
} from '@hubspot/api-client/lib/codegen/crm/contacts';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateContactRequestBodyDTO } from './dtos/requests/create-contact-request-body.dto copy';
import { UpdateContactByIdRequestBodyDTO } from './dtos/requests/update-contact-by-id-request-body.dto';
import { UpdateContactByIdResponse } from './dtos/responses/update-contact-by-id-response.dto';
import { LifeCycleStageENUM } from './enums/life-cycle-stage.enum';
import { Contact } from './types/contact.type';

@Injectable()
export class ContactsService {
  private hubspotClient: hubspot.Client;

  private contactPropertiesToReturnFromApi = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'company',
    'lifecyclestage',
    'project_status',
    'blip_identity',
    'blip_source',
    'blip_ticket_id',
  ];

  constructor(private readonly configService: ConfigService) {
    this.hubspotClient = new hubspot.Client({
      accessToken: this.configService.get<string>('HUBSPOT_ACCESS_TOKEN'),
    });
  }

  async getContactByEmail(email: string): Promise<Contact> {
    let apiResponse: CollectionResponseWithTotalSimplePublicObjectForwardPaging;

    try {
      const publicObjectSearchRequest: PublicObjectSearchRequest = {
        filterGroups: [
          {
            filters: [
              {
                operator: 'EQ',
                propertyName: 'email',
                value: email,
              },
            ],
          },
        ],
        sorts: undefined,
        properties: this.contactPropertiesToReturnFromApi,
        limit: undefined,
        after: undefined,
      };

      apiResponse = await this.hubspotClient.crm.contacts.searchApi.doSearch(
        publicObjectSearchRequest,
      );
    } catch (error) {
      this.handleError(error);
    }

    const foundContact = apiResponse?.results[0];
    const contactProperties = foundContact?.properties;

    if (!foundContact) {
      throw new HttpException('Contact not found', HttpStatus.NO_CONTENT);
    }

    const returnContact: Contact = {
      id: foundContact.id,
      firstName: contactProperties.firstname,
      lastName: contactProperties.lastname,
      email: contactProperties.email,
      phone: contactProperties.phone,
      company: contactProperties.company,
      lifeCycleStage: contactProperties.lifecyclestage,
      isClient: this.isClient(contactProperties.lifecyclestage),
      projectStatus: contactProperties.project_status,
      blipIdentity: contactProperties.blip_identity,
      blipSource: contactProperties.blip_source,
      blipTicketId: contactProperties.blip_ticket_id,
      createdAt: foundContact.createdAt,
      updatedAt: foundContact.updatedAt,
      isArchived: foundContact.archived,
    };

    return returnContact;
  }

  async createContact(contact: CreateContactRequestBodyDTO): Promise<Contact> {
    if (!this.isClient(contact.lifeCycleStage) && contact.projectStatus) {
      throw new HttpException(
        'Project status can only be assigned to clients',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const createContactProperties = {
        firstname: contact.firstName,
        lastname: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        lifecyclestage: contact.lifeCycleStage,
        project_status: contact.projectStatus,
        blip_identity: contact.blipIdentity,
        blip_source: contact.blipSource,
      };

      const apiResponse = await this.hubspotClient.crm.contacts.basicApi.create(
        {
          properties: createContactProperties,
        },
      );

      const createdContactProperties = apiResponse.properties;

      const returnContact: Contact = {
        id: apiResponse.id,
        firstName: createdContactProperties.firstname,
        lastName: createdContactProperties.lastname,
        email: createdContactProperties.email,
        phone: createdContactProperties.phone,
        company: createdContactProperties.company,
        lifeCycleStage: createdContactProperties.lifecyclestage,
        isClient: this.isClient(createdContactProperties.lifecyclestage),
        projectStatus: createdContactProperties.project_status,
        blipIdentity: createdContactProperties.blip_identity,
        blipSource: createdContactProperties.blip_source,
        blipTicketId: createdContactProperties.blip_ticket_id,
        createdAt: apiResponse.createdAt,
        updatedAt: apiResponse.updatedAt,
        isArchived: apiResponse.archived,
      };

      return returnContact;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateContactById(
    id: string,
    contact: UpdateContactByIdRequestBodyDTO,
  ): Promise<UpdateContactByIdResponse> {
    if (!this.isClient(contact.lifeCycleStage) && contact.projectStatus) {
      throw new HttpException(
        'Project status can only be assigned to clients',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const updateContactProperties = {
        firstname: contact.firstName,
        lastname: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        lifecyclestage: contact.lifeCycleStage,
        project_status: contact.projectStatus,
        blip_identity: contact.blipIdentity,
        blip_source: contact.blipSource,
        blip_ticket_id: contact.blipTicketId,
      };

      const apiResponse = await this.hubspotClient.crm.contacts.basicApi.update(
        id,
        {
          properties: updateContactProperties,
        },
      );

      const updatedContactProperties = apiResponse.properties;

      const returnContact: UpdateContactByIdResponse = {
        id: apiResponse.id,
        firstName: updatedContactProperties.firstname,
        lastName: updatedContactProperties.lastname,
        email: updatedContactProperties.email,
        phone: updatedContactProperties.phone,
        company: updatedContactProperties.company,
        lifeCycleStage: updatedContactProperties.lifecyclestage,
        projectStatus: updatedContactProperties.project_status,
        blipIdentity: updatedContactProperties.blip_identity,
        blipSource: updatedContactProperties.blip_source,
        blipTicketId: updatedContactProperties.blip_ticket_id,
        createdAt: apiResponse.createdAt,
        updatedAt: apiResponse.updatedAt,
        isArchived: apiResponse.archived,
      };

      return returnContact;
    } catch (error) {
      this.handleError(error);
    }
  }

  private isClient(lifeCycleStage: string): boolean {
    if (
      lifeCycleStage === LifeCycleStageENUM.CUSTOMER ||
      lifeCycleStage === LifeCycleStageENUM.EVANGELIST
    ) {
      return true;
    } else {
      return false;
    }
  }

  private handleError(error: any) {
    const errorCode = error?.code
      ? error.code
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = error?.body?.message
      ? error.body.message
      : JSON.stringify(error);

    throw new HttpException(errorMessage, errorCode);
  }
}
