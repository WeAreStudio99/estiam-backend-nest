import { createId } from '@paralleldrive/cuid2';
import { text, pgTable, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text('username'),
  password: text('password'),
});

export const databaseSchema = {
  users,
};
