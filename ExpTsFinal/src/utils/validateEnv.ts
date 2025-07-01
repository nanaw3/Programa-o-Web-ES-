import { cleanEnv, port, str } from 'envalid';

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    LOGS_PATH: str({ default: './logs/app.log' }) // já antecipa o uso do logger da etapa #4
  });
}
