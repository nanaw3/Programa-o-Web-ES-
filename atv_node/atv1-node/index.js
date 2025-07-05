const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });


const pasta = process.argv[2];

if (!pasta) {
  console.error('informe um diretorio como argumento.');
  process.exit(1);
}

const port = process.env.PORT || 3000; 

http.createServer((req, res) => {
  fs.readdir(pasta, (err, arquivos) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro ao ler diretorio.');
      return;
    }  
 const listaHtml = arquivos.map(nome => `<li>${nome}</li>`).join('');
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Arquivos de ${pasta}</title>
      </head>
      <body>
        <h1>Arquivos no diretório: ${pasta}</h1>
        <ul>${listaHtml}</ul>
      </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    
  });
}).listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port} [env: ${process.env.NODE_ENV}]`);
});