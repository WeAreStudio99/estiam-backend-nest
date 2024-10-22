import { Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleService } from 'src/database/drizzle.service';
import { databaseSchema } from 'src/database/database-schema';
import { eq, sql } from 'drizzle-orm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(createUserDto: CreateUserDTO) {
    const userQuery = this.drizzleService.db
      .insert(databaseSchema.users)
      .values({
        username: sql.placeholder('username'),
        password: sql.placeholder('password'),
      })
      .returning()
      .prepare('create_user');

    const { password, ...createUserDtoWithoutPassword } = createUserDto;

    const hashedPassword = await hash(password, 10);

    const user = await userQuery.execute({
      ...createUserDtoWithoutPassword,
      password: hashedPassword,
    });

    return user;
  }

  async findAll() {
    const usersQuery = this.drizzleService.db.query.users
      .findMany()
      .prepare('find_all_users');

    const users = await usersQuery.execute();

    return users;
  }

  async findOne(id: string) {
    const userQuery = this.drizzleService.db.query.users
      .findFirst({
        where: (user, { eq }) => eq(user.id, sql.placeholder('id')),
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
        where: (user, { eq }) => eq(user.username, sql.placeholder('username')),
      })
      .prepare('find_user_by_username');

    const user = await userQuery.execute({ username });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    const usersQuery = this.drizzleService.db
      .update(databaseSchema.users)
      .set({ ...updateUserDto, updated_at: new Date() })
      .where(eq(databaseSchema.users.id, sql.placeholder('id')))
      .returning()
      .prepare('update_user');

    const users = await usersQuery.execute({ id });

    if (users.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }

  async remove(id: string) {
    const usersQuery = this.drizzleService.db
      .delete(databaseSchema.users)
      .where(eq(databaseSchema.users.id, sql.placeholder('id')))
      .returning()
      .prepare('delete_user');

    const users = await usersQuery.execute({ id });

    if (users.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return users[0];
  }
}
