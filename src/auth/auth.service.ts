import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const hashMatch = await compare(password, user.password);

    if (!user || !hashMatch) {
      return null;
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
        role: user.role,
      }),
    };
  }
}
