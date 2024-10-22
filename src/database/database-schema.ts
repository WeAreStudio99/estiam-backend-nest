import { createId } from '@paralleldrive/cuid2';
import { text, pgTable } from 'drizzle-orm/pg-core';
import { timestamps } from './database-helpers';

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  ...timestamps,
});

export const databaseSchema = {
  users,
};
