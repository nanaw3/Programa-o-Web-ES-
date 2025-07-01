import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logPath = process.env.LOGS_PATH || './logs/app.log';

// Garante que a pasta exista
const logDir = path.dirname(logPath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export function logger(format: 'simples' | 'completo' = 'simples') {
  return (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    const basicInfo = `[${now}] ${req.method} ${req.url}`;
    const fullInfo = `${basicInfo} HTTP/${req.httpVersion} ${req.headers['user-agent']}`;

    const logLine = format === 'completo' ? fullInfo : basicInfo;

    fs.appendFileSync(logPath, logLine + '\n');
    next();
  };
}
