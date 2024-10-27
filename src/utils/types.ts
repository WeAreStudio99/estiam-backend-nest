import { Column, InferSelectModel, Table, TableConfig } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';
import { Request } from 'express';
import { JwtUser } from 'src/auth/strategies/jwt.strategy';

export type UpsertReturn<
  T extends Table<TableConfig<Column<any, object, object>>>,
> = Partial<Record<keyof InferSelectModel<T>, PgColumn>>;

export type JwtAuthenticatedRequest = Request & { user: JwtUser };
