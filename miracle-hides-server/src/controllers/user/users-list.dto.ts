import { User } from 'src/dtos/user.interface';
import { UsersListEntryDto } from './users-list-entry.dto';

export class UsersListDto {
  constructor(users: User[]) {
    if (users) {
      this.users = users.map(user => new UsersListEntryDto(user));
    } else {
      this.users = [];
    }
  }

  users : UsersListEntryDto[];
}
