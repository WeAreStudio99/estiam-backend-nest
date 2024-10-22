import { createId } from '@paralleldrive/cuid2';
import { text, pgTable } from 'drizzle-orm/pg-core';
import { timestamps } from './database-helpers';

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text().notNull().unique(),
  password: text().notNull(),
  ...timestamps,
});

export const databaseSchema = {
  users,
};
