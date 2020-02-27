
export const config = Object.freeze({
  port: Number(process.env.PORT) || 8080,
  database: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'netguru://postgres@localhost:5433/postgres',
    migrations: {
      directory: './migrations'
    }
  },
  apiKey: process.env.apikey || 'e6f8980b'
})

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonlyObject<T[P]>;
};

export type Config = DeepReadonlyObject<typeof config>;
