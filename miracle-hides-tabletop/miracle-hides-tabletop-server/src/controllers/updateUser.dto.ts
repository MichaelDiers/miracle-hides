import { IsArray, IsBoolean, IsIn, IsString, IsUUID, Length } from 'class-validator';
import UserRoles, { UserRolesList } from 'src/types/user-roles';

export default class UpdateUserDto {
  @IsString()
  @Length(3, 50)
  displayName: string;

  @IsUUID(4)
  guid: string;

  @IsBoolean()
  isVerified: boolean;

  @IsArray()
  @IsIn(UserRolesList, { each: true })
  roles: UserRoles[];
}
