import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION_POOL } from './database.module-definition';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { users } from './database-schema';

const dbSchema = {
  users: users,
};

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof dbSchema>;
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {
    this.db = drizzle(this.pool, { schema: dbSchema });
  }
}
