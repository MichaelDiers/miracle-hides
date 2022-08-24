import { IsBoolean, IsEmail, IsOptional, IsString, isUUID, IsUUID, Length, ValidateIf } from 'class-validator';

export class CreateUserInvitationsDto {
  @IsOptional()
  @ValidateIf((obj) => obj?.length > 0)
  @IsEmail()
  email?: string;

  @IsString()
  @Length(3, 256)
  name: string;
}

export class DeleteUserInvitationsDto {
  @IsUUID(4)
  guid: string;
}

export class UpdateUserInvitationsDto {
  @IsUUID(4)
  guid: string;

  @IsBoolean()
  isActive: boolean;
}