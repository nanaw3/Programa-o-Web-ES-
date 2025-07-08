export function validateEnv() {
  const port = process.env.PORT

  if (!port) {
    throw new Error("A variável de ambiente PORT não está definida.")
  }

  const portNum = Number(port)
  if (isNaN(portNum) || portNum <= 0) {
    throw new Error("A variável de ambiente PORT deve ser um número positivo.")
  }
}
