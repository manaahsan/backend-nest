import { PassportSerializer } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { Observable } from 'rxjs';
import { promises } from 'dns';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.userService.findByUserID(user.id);

    return userDB ? done(null, userDB) : done(null, null);
  }
}

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const requset = context.switchToHttp().getRequest();
    return requset.isAuthenticated();
  }
}
