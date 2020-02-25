import {DeepReadonlyObject} from './utils/deepReadOnly';

export const config = Object.freeze({
  port: Number(process.env.PORT) || 3000,
  database: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres@localhost:5433/netguru'
  },
});

export type Config = DeepReadonlyObject<typeof config>;
