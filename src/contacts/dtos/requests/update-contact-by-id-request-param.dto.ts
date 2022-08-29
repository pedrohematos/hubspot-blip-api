import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateContactByIdParam {
  @IsNotEmpty()
  @IsString()
  id: string;
}
