import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteDto {
  @IsUUID(4)
  @IsNotEmpty()
  public userId: string;
}
