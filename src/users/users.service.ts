import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq, InferInsertModel, sql } from 'drizzle-orm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { users } from 'src/database/database-schema';
import { UserWithoutPasswordReturn } from './users-helpers';
import { JwtUser } from 'src/auth/strategies/jwt.strategy';

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  userWithtoutPasswordReturn: UserWithoutPasswordReturn<typeof users> = {
    id: users.id,
    username: users.username,
    role: users.role,
    updated_at: users.updated_at,
    created_at: users.created_at,
  };

  async create(createUserDto: CreateUserDTO) {
    const usersQuery = this.drizzleService.db
      .insert(users)
      .values({
        username: sql.placeholder('username'),
        password: sql.placeholder('password'),
      })
      .returning(this.userWithtoutPasswordReturn)
      .prepare('create_user');

    const { password, ...createUserDtoWithoutPassword } = createUserDto;

    const hashedPassword = await hash(password, 10);

    const userSelectPayload: InferInsertModel<typeof users> = {
      ...createUserDtoWithoutPassword,
      password: hashedPassword,
    };

    const createdUsers = await usersQuery
      .execute(userSelectPayload)
      .catch((err: any) => {
        if ('code' in err && err.code === '23505') {
          return new BadRequestException('Username already exists');
        }

        return new Error();
      });

    if (createdUsers instanceof Error) {
      throw createdUsers;
    }

    return createdUsers[0];
  }

  async findAll() {
    const usersQuery = this.drizzleService.db.query.users
      .findMany({ columns: { password: false } })
      .prepare('find_all_users');

    const foundUsers = await usersQuery.execute();

    return foundUsers;
  }

  async findOne(id: string, reqUser: JwtUser) {
    if (reqUser.role !== 'admin' && reqUser.id !== id) {
      throw new UnauthorizedException('You can only see your data');
    }

    const userQuery = this.drizzleService.db.query.users
      .findFirst({
        where: eq(users.id, sql.placeholder('id')),
        columns: { password: false },
      })
      .prepare('find_one_user');

    const user = await userQuery.execute({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string) {
    const userQuery = this.drizzleService.db.query.users
      .findFirst({
        where: eq(users.username, sql.placeholder('username')),
      })
      .prepare('find_user_by_username');

    const user = await userQuery.execute({ username });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO, reqUser: JwtUser) {
    if (reqUser.role !== 'admin' && reqUser.id !== id) {
      throw new UnauthorizedException('You can only update your data');
    }

    if (reqUser.role !== 'admin' && updateUserDto.role === 'admin') {
      throw new UnauthorizedException(
        `Only admin users can update the role property`,
      );
    }

    const usersQuery = this.drizzleService.db
      .update(users)
      .set({ ...updateUserDto, updated_at: new Date() })
      .where(eq(users.id, sql.placeholder('id')))
      .returning(this.userWithtoutPasswordReturn)
      .prepare('update_user');

    const updatedUsers = await usersQuery.execute({ id });

    if (updatedUsers.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUsers[0];
  }

  async remove(id: string, reqUser: JwtUser) {
    if (reqUser.role !== 'admin' && reqUser.id !== id) {
      throw new UnauthorizedException('You can only delete your data');
    }

    const usersQuery = this.drizzleService.db
      .delete(users)
      .where(eq(users.id, sql.placeholder('id')))
      .returning(this.userWithtoutPasswordReturn)
      .prepare('delete_user');

    const deletedUsers = await usersQuery.execute({ id });

    if (deletedUsers.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return deletedUsers[0];
  }
}
