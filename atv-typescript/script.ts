function calcular(): void {
  const raioInput = document.getElementById('raio') as HTMLInputElement;
  const areaInput = document.getElementById('area') as HTMLInputElement;
  const circInput = document.getElementById('circunferencia') as HTMLInputElement;

  const raio: number = parseFloat(raioInput.value);

  if (isNaN(raio) || raio < 0) {
    alert("Informe um raio valido.");
    return;
  }

  const area: number = Math.PI * raio * raio;
  const circunferencia: number = 2 * Math.PI * raio;

  areaInput.value = area.toFixed(2);
  circInput.value = circunferencia.toFixed(2);
}
