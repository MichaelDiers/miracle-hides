import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersDatabaseService } from '../../databases/users-database/users-database.service';
import { AuthenticateUserDto } from '../../dtos/authenticate-user.dto';
import { HashService } from '../../services/hash/hash.service';
import { JwtService } from 'src/services/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly usersDatabaseService: UsersDatabaseService,
  ) {}

  public async signIn(
    authenticateUser: AuthenticateUserDto,
  ): Promise<string> {
    const user = await this.usersDatabaseService.findUserAsync(userEntity => this.hashService.compare(authenticateUser.email, userEntity.email));
    if (!user 
      || !user.isEmailVerified
      || await this.hashService.compare(authenticateUser.password, user.password) !== true) {
      throw new UnauthorizedException();
    }

    return this.jwtService.createTokenAsync(user.userId);
  }
}
