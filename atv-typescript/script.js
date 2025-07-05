function calcular() {
    var raioInput = document.getElementById('raio');
    var areaInput = document.getElementById('area');
    var circInput = document.getElementById('circunferencia');
    var raio = parseFloat(raioInput.value);
    if (isNaN(raio) || raio < 0) {
        alert("Informe um raio valido.");
        return;
    }
    var area = Math.PI * raio * raio;
    var circunferencia = 2 * Math.PI * raio;
    areaInput.value = area.toFixed(2);
    circInput.value = circunferencia.toFixed(2);
}
