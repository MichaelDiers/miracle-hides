import { IsEmail } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const emailSchemaEntry = () => createSchemaEntry({
  name: 'email',
  type: String,
  unique: true,
});

export default interface IEmail {
  email: string;
}

export class EmailDto implements IEmail {
  @IsEmail()
  email: string;
}
