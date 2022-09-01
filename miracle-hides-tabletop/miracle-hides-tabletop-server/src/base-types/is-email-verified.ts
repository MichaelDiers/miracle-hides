import { IsBoolean } from 'class-validator';
import { isVerifiedSchemaEntry } from './is-verified';

export const isEmailVerifiedSchemaEntry = () => isVerifiedSchemaEntry('isEmailVerified');

export interface IIsEmailVerified {
  isEmailVerified: boolean;
}

export default class IsEmailVerifiedDto implements IIsEmailVerified {
  @IsBoolean()
  isEmailVerified: boolean;
}
