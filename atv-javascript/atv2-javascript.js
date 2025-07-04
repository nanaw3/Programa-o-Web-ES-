let pontuacao = 0;

while (true) {
  let escolha = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));

  if (![1, 2, 3].includes(escolha)) {
    console.log("Jogada inválida. Você perdeu!");
    break;
  }

  const opcoes = ["Papel", "Pedra", "Tesoura"];
  const escolhaComputador = Math.floor(Math.random() * 3) + 1;

  console.log(`O computador jogou ${opcoes[escolhaComputador - 1]}`);

  if (escolha === escolhaComputador) {
    console.log("A rodada empatou!");
  } else if (
    (escolha === 1 && escolhaComputador === 2) ||
    (escolha === 2 && escolhaComputador === 3) ||
    (escolha === 3 && escolhaComputador === 1)
  ) {
    console.log("Você ganhou!");
    pontuacao++;
  } else {
    console.log(`Você perdeu! A sua pontuação foi de ${pontuacao}`);
    break;
  }
}
