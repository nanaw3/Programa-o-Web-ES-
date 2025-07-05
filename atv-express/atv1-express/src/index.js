import express from 'express'
import dotenv from 'dotenv'

// Carrega variáveis de ambiente
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}`)
})
