import { entities } from '@app/infrastructure';
import { Options } from '@mikro-orm/core';

export default (): Options => {
  const params: Options = {
    type: 'postgresql',
    debug: ['query'],
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    entities,
    entitiesTs: entities,
    migrations: {
      path: './migrations',
      disableForeignKeys: false,
    },
  };

  if (!params.dbName) {
    throw new Error(`Database name must be declared explicitly.`);
  }

  if (!params.user) {
    throw new Error(`Database user name must be declared explicitly.`);
  }

  if (!params.host) {
    throw new Error(`Database host must be declared explicitly.`);
  }

  return params;
};
