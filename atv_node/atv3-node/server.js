import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, 'public')
const PORT = process.env.PORT || 3333

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)

    if (url.pathname === '/generate') {
        const qtd = parseInt(url.searchParams.get('qtd') || '1')
        let body = ''
        for (let i = 0; i < qtd; i++) {
            body += `<p>${lorem.generateParagraphs(1)}</p>\n`
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(body)
        return
    }
    if (url.pathname === '/') {
        const indexPath = path.join(publicDir, 'index.html')
        const html = await fs.readFile(indexPath)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(html)
        return
    }
    try {
        const filePath = path.join(publicDir, url.pathname)
        const ext = path.extname(filePath).slice(1)
        const types = { html: 'text/html', css: 'text/css', js: 'application/javascript' }
        const file = await fs.readFile(filePath)
        res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' })
        res.end(file)
    } catch {
        res.writeHead(404)
        res.end('Arquivo nao encontrado.')
    }
})

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
