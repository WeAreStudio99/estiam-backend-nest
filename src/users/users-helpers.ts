import { Column, InferSelectModel, Table, TableConfig } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';

export type UserWithoutPasswordReturn<
  T extends Table<TableConfig<Column<any, object, object>>>,
> = Partial<Record<keyof InferSelectModel<T>, PgColumn>>;
