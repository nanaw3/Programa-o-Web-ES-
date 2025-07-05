import http from 'http';
import { readdir, readFile } from 'fs/promises';
import { resolve, join } from 'path';
import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });


const pasta = process.argv[2];

if (!pasta) {
  console.error('informe um diretorio como argumento.');
  process.exit(1);
}

const port = process.env.PORT || 3000; 

const server = http.createServer(async (req, res) => {
  const url = decodeURIComponent(req.url);
if (url === '/') {
    try {
      const arquivos = await readdir(pasta);
      const lista = arquivos
        .map(arquivo => `<li><a href="/${arquivo}">${arquivo}</a></li>`)
        .join('');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<ul>${lista}</ul>`);
    } catch (err) {
      res.writeHead(500);
      res.end('Erro ao ler diretorio');
    }
  } else {
    try {
      const caminho = resolve(join(pasta, url.slice(1)));
      const conteudo = await readFile(caminho, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <a href="/">Voltar</a>
        <pre>${conteudo}</pre>
      `);
    } catch (err) {
      res.writeHead(404);
      res.end('Arquivo nao encontrado');
    }
  }
});
server.listen(port, () => {
  console.log(`🚀 Servidor em http://localhost:${port}`);
});