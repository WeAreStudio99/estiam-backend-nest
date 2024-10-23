import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '5daa821dc0c732bd1337add8ae767f01e3eccfd4ba7a5911ddd9939595d6e402',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}