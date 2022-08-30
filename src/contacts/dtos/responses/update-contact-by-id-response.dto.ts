import { ApiProperty } from '@nestjs/swagger';
import { LifeCycleStageENUM } from 'src/contacts/enums/life-cycle-stage.enum';
import { ProjectStatusENUM } from 'src/contacts/enums/project-status.enum';

export class UpdateContactByIdResponse {
  @ApiProperty({
    required: false,
    description: 'Contact Hubspot CRM id',
  })
  id?: string;

  @ApiProperty({
    required: false,
    description: 'Contact first name',
  })
  firstName?: string;

  @ApiProperty({
    required: false,
    description: 'Contact last name',
  })
  lastName?: string;

  @ApiProperty({
    required: false,
    description: 'Contact email address',
  })
  email?: string;

  @ApiProperty({
    required: false,
    description: 'Contact phone number',
  })
  phone?: string;

  @ApiProperty({
    required: false,
    description: 'Contact company',
  })
  company?: string;

  @ApiProperty({
    required: false,
    enum: Object.values(LifeCycleStageENUM),
    description: 'Contact stage in the sales funnel',
  })
  lifeCycleStage?: string;

  @ApiProperty({
    required: false,
    enum: Object.values(ProjectStatusENUM),
    description: 'Contact project status',
  })
  projectStatus?: string;

  @ApiProperty({
    required: false,
    description: 'Blip unique contact identity',
  })
  blipIdentity?: string;

  @ApiProperty({
    required: false,
    description: 'Blip contact source channel',
  })
  blipSource?: string;

  @ApiProperty({
    required: false,
    description: 'Blip attendance sequential ticket id',
  })
  blipTicketId?: string;

  @ApiProperty({
    required: false,
    description: 'Indicates when the contact was created',
  })
  createdAt?: Date;

  @ApiProperty({
    required: false,
    description: 'Indicates when the contact was last updated',
  })
  updatedAt?: Date;

  @ApiProperty({
    required: false,
    description: 'Indicates if the contact is archived',
  })
  isArchived?: boolean;
}
