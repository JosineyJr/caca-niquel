const casas = [
  "7.png",
  "diamond.png",
  "gold_bar.png",
  "pineapple.png",
  "uva.png",
  "watermelon.png",
];

let escolhendo,
  creditos = parseInt($("#creditos").val()),
  aposta = parseInt($("#aposta").val());

function setCreditos(credits) {
  $("#creditos").val(credits);
  creditos = credits;
  console.log(creditos);
}

function setAposta(bet) {
  $("#aposta").val(bet);
  aposta = bet;
}

function gerarCasa() {
  $(".casa img").each(function (index, element) {
    element.src = casas[Math.floor(Math.random() * Math.floor(casas.length))];// gera um indice aleatorio
  });
}

function jogar() {
  setAposta($("#aposta").val());
  if (aposta >= 1 && aposta > 0 && aposta <= creditos) {
    escolhendo = setInterval(gerarCasa, 100);
    return true;
  }
  return false;
}

function stopGerarCasa() {
  clearInterval(escolhendo);
}
function apostar(opcao) {
  if (opcao) {
    if (aposta < creditos) {
      aposta++;
      setAposta(aposta);
      return true;
    }
    return false;
  }
  if (aposta > 1) {
    aposta--;
    setAposta(aposta);
    return false;
  }
  return false;
}

function verificarJogo() {
  const casasJogo = [];
  $(".casa img").each((index, element) => {
    casasJogo.push(
      element.src.toString().split("/")[
        element.src.toString().split("/").length - 1
      ]
    );
  });
  let trinca = 0,
    iguais = 0,
    aux = "";
  //   console.log(casasJogo);
  for (let index = 0; index < casasJogo.length; index++) {
    if (
      casasJogo[index + 1] === casasJogo[index] &&
      casasJogo[index + 2] === casasJogo[index] &&
      !(casasJogo[index + 2] === casasJogo[index + 3])
    ) {
      trinca++;
    }
    for (let jindex = casasJogo.length - 1; jindex > 0; jindex--) {
      if (jindex !== index && casasJogo[jindex] === casasJogo[index]) {
        iguais++;
      }
    }
  }
  if (iguais / 5 === casasJogo.length - 1) {
    // dividindo por 5, porque passa 5 vezes em cada casa
    alert("FIGURAS IGUAIS!\nVOCÊ GANHOU: " + aposta * 10);
    setCreditos(creditos + aposta * 10);
    return true;
  }
  if (trinca === 1) {
    alert(
      "UMA TRINCA SEQUENCIAL DE FIGURAS IGUAIS!\nVOCÊ GANHOU: " + aposta * 4
    );
    setCreditos(creditos + aposta * 4);
    return true;
  }
  if (trinca === 2) {
    alert(
      "DUAS TRINCAS SEQUENCIAIS DE FIGURAS DIFERENTES!\nVOCÊ GANHOU: " +
        aposta * 6
    );
    setCreditos(creditos + aposta * 6);
    return true;
  }
  if (!iguais) {
    alert("FIGURAS DIFERENTES!\nVOCÊ GANHOU: " + aposta * 8);
    setCreditos(creditos + aposta * 8);
    return true;
  }
  alert("APOSTA PERDIDA!");
  creditos -= aposta;
  setCreditos(creditos);
}

$(document).ready(() => {
  $("#jogar").on("click", () => {
    if (jogar()) {
      setTimeout(stopGerarCasa, 2000);
      setTimeout(verificarJogo, 2300);
    } else {
      alert("APOSTE UM VALOR VÁLIDO!");
    }
  });
  $("#apostarMenos").on("click", () => {
    apostar(0);
  });
  $("#apostarMais").on("click", () => {
    apostar(1);
  });
});
