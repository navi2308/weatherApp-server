import { IsString, IsEmail } from 'class-validator';

export class UpdateUserPreferenceDto {
  @IsString()
  preferedLocation: string;
}
