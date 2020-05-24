import { useAsync, UseAsyncReturn } from "react-async-hook";
import { Database, DatabaseContext, NamedSchema, Schema } from "remultiform";

export const useDatabase = <
  DBNamedSchema extends NamedSchema<string, number, Schema>
>(
  context: DatabaseContext<DBNamedSchema> | undefined
): UseAsyncReturn<Database<DBNamedSchema> | undefined> => {
  return useAsync(async () => {
    if (!context) {
      return;
    }

    const db = await context.database;

    return db;
  }, [Boolean(context)]);
};
