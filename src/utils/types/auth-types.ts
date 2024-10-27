import { LocalStrategy } from '@auth/strategies/local.strategy';

export type LocalUser = Awaited<ReturnType<LocalStrategy['validate']>>;

export type JwtUser = {
  id: string;
  username: string;
  role: string;
};

export type JwtPayload = {
  sub: string;
  username: string;
  role: string;
};

export type JwtAuthenticatedRequest = Request & { user: JwtUser };

export type LocalAuthenticatedRequest = Request & {
  user: LocalUser;
};
