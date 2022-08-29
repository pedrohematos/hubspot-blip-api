import { ApiProperty } from '@nestjs/swagger';
import { LifeCycleStageENUM } from 'src/contacts/enums/life-cycle-stage.enum';
import { ProjectStatusENUM } from 'src/contacts/enums/project-status.enum';

export class Contact {
  @ApiProperty({ description: 'Contact Hubspot CRM id' })
  id: string;

  @ApiProperty({ description: 'Contact first name' })
  firstName: string;

  @ApiProperty({ description: 'Contact last name' })
  lastName: string;

  @ApiProperty({ description: 'Contact email address' })
  email: string;

  @ApiProperty({ description: 'Contact phone number' })
  phone: string;

  @ApiProperty({ description: 'Contact company' })
  company: string;

  @ApiProperty({
    enum: Object.values(LifeCycleStageENUM),
    description: 'Contact stage in the sales funnel',
  })
  lifeCycleStage: string;

  @ApiProperty({ description: 'Indicates if the contact is a client' })
  isClient: boolean;

  @ApiProperty({
    enum: Object.values(ProjectStatusENUM),
    description: 'Contact project status',
  })
  projectStatus: string;

  @ApiProperty({ description: 'Blip unique contact identity' })
  blipIdentity: string;

  @ApiProperty({ description: 'Blip contact source channel' })
  blipSource: string;

  @ApiProperty({ description: 'Indicates when the contact was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Indicates when the contact was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'Indicates if the contact is archived' })
  isArchived: boolean;
}
