import { createId } from '@paralleldrive/cuid2';
import { text, pgTable, pgEnum, timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
};

const userRoleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: userRoleEnum().notNull().default('user'),
  ...timestamps,
});
