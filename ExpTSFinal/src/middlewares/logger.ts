import fs from "fs"
import path from "path"
import { Request, Response, NextFunction } from "express"

const logDir = process.env.LOG_DIR || "logs"
const logType = process.env.LOG_TYPE || "simples"

export function logger(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString()
  const url = req.url
  const method = req.method
  const httpVersion = req.httpVersion
  const userAgent = req.get("User-Agent") || ""

  const logLine =
    logType === "completo"
      ? `${timestamp} ${method} ${url} HTTP/${httpVersion} ${userAgent}\n`
      : `${timestamp} ${method} ${url}\n`

  // Cria a pasta se não existir
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }

  fs.appendFile(path.join(logDir, "access.log"), logLine, (err) => {
    if (err) console.error("Erro ao escrever log:", err)
  })

  next()
}
