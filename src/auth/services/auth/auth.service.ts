import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userservice: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userservice.findByUsername(username);
    if (user) {
      const matchCrentials = comparePassword(password, user.password);
      if (matchCrentials) {
        return user;
      } else {
        return null;
      }
    }
    return null;
  }
}
