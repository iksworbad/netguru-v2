
export const config = Object.freeze({
  database: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'netguru://postgres@localhost:5433/postgres'
  },
  apiKey: process.env.apikey || 'e6f8980b'
})

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonlyObject<T[P]>;
};

export type Config = DeepReadonlyObject<typeof config>;
