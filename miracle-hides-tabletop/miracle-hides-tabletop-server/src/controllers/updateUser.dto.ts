import { ArrayMinSize, arrayMinSize, IsArray, IsIn, IsInstance, IsString, IsUUID, Length, MinLength } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @Length(3, 50)
  displayName: string;

  @IsUUID(4)
  guid: string;

  @IsArray()
  @IsIn([UserRoles.ADMIN, UserRoles.POWERUSER, UserRoles.READONLY, UserRoles.USER], { each: true })
  roles: UserRoles[];
}
