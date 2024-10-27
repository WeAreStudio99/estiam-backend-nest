import { Column, InferSelectModel, Table, TableConfig } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';

export type UserWithoutPasswordReturn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Table<TableConfig<Column<any, object, object>>>,
> = Partial<Record<keyof InferSelectModel<T>, PgColumn>>;
