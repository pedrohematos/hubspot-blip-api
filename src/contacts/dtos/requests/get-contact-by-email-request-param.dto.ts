import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetContactByEmailParam {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
