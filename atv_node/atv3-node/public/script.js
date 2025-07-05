async function gerar() {
  const qtd = document.getElementById('qtd').value
  const resp = await fetch(`/generate?qtd=${qtd}`)
  const html = await resp.text()
  document.getElementById('resultado').innerHTML = html
}
