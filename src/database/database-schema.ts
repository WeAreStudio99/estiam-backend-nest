import { createId } from '@paralleldrive/cuid2';
import { text, pgTable, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from './database-helpers';

export const userRoleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: userRoleEnum().notNull().default('user'),
  ...timestamps,
});
