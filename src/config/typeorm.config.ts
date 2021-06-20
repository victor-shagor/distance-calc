import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as parseDBUrl from 'parse-database-url';
import env from './configuration';

const config = parseDBUrl(env().DATABASE_URL);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
