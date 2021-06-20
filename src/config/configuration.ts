import { cleanEnv, CleanEnv, url } from 'envalid';

interface BaseEnvironment {
  DATABASE_URL: string;
}

export type Environment = CleanEnv & BaseEnvironment;

let env: Environment;

export default () => {
  if (!env) {
    env = cleanEnv<BaseEnvironment>(process.env, {
      DATABASE_URL: url({
        desc: 'Full URL to connect to database server.',
        example: 'postgresql://username:password@localhost:5432/database',
      }),
    });
  }
  return env;
};
