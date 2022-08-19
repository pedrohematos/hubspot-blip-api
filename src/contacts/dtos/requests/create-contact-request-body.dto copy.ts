import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { LifeCycleStageENUM } from 'src/contacts/enums/life-cycle-stage.enum';
import { ProjectStatusENUM } from 'src/contacts/enums/project-status.enum';

export class CreateContactRequestBodyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Contact first name' })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Contact last name',
  })
  lastName?: string;

  @IsEmail()
  @ApiProperty({
    description: 'Contact email address. It is the contact primary key',
  })
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  @ApiProperty({
    required: false,
    description: 'Contact phone number. Accept only brazilian numbers',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Contact company',
  })
  company?: string;

  @IsEnum(LifeCycleStageENUM, {
    message: `lifeCycleStage must be one these values: ${Object.values(
      LifeCycleStageENUM,
    )}`,
  })
  @ApiProperty({
    enum: Object.values(LifeCycleStageENUM),
    description: 'Contact stage in the sales funnel',
  })
  lifeCycleStage: LifeCycleStageENUM;

  @IsOptional()
  @IsEnum(ProjectStatusENUM, {
    message: `projectStatus must be one these values: ${Object.values(
      ProjectStatusENUM,
    )}`,
  })
  @ApiProperty({
    required: false,
    enum: Object.values(ProjectStatusENUM),
    description: 'Contact project status',
  })
  projectStatus?: ProjectStatusENUM;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Blip unique contact identity',
  })
  blipIdentity?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Blip contact source channel',
  })
  blipSource?: string;
}
