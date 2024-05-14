declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PORT: number;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
