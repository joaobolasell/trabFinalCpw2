
// seleciona todos os elementos com a classe memory-card
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; // Variável para verificar se carta foi virada
let lockBoard = false;
let firstCard, secondCard;
let fim = 0;


function flipCard() {
  if (lockBoard) return; // Se o tabuleiro estiver bloqueado, não faz nada
  if (this === firstCard) return; // Se a carta clicada for a mesma, não faz nada

  this.classList.add('flip'); // Adiciona a classe flip ao elemento clicado para virar a carta no css

  //(!hasFlippedCard)==true
  // se nenhuma carta foi virada(hasFlippedCard = false) seta hasFlippedCard para true e seta a primeira carta clicada para firstCard
  if (!hasFlippedCard) {                      
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // se a primeira carta já foi virada(hasFlippedCard = true) seta a segunda carta clicada para secondCard e chama a função checkForMatch para verificar se as cartas são iguais
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // foi adicionado um data-framework para cada carta no html, contendo o valor da carta para comparação
  // Verifica se o dataset da primeira carta clicada é igual ao dataset da segunda carta clicada
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  // se for igual, chama a função disableCards, se não chama a função unflipCards
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  // incrementa a variável fim a cada carta combinada, quando chegar a 6, pausa cronomêtro e acaba o jogo
  fim++;
  fim == 6 ? alert("Parabéns, você ganhou!") : null;
  if (fim == 6) {
    pause();
  }

  // remove o evento de click das cartas para que não possam ser clicadas novamente
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  // reseta as variáveis para que o jogo possa continuar
  resetBoard();
}

// função para desvirar as cartas, remove a classe flip do css e reseta as variáveis para que o jogo possa continuar
// lockBoard = true para que o usuário não possa clicar em outras cartas enquanto as cartas estão sendo desviradas
// setTimeout para que o usuário possa ver as cartas antes de serem desviradas
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// função para embaralhar as cartas
// funcao imediatamente invocada, quando carrega a pagina, embaralha as cartas
// Math.random() gera um numero aleatorio entre 0 e 11 e coloca na propriedade order 
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// adiciona o evento de click para cada carta
cards.forEach(card => card.addEventListener('click', flipCard));

//----------------------------------  -------------------------------------------------

// Obtém os parâmetros de consulta da URL
const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get("nome");


// Exibe os dados na página
document.getElementById("nomeResultado").textContent = nome;

//----------------------------------------



// Função para pausar o jogo
function pausarJogo(){  
  pause();
  alert("Jogo pausado, clique em OK para continuar");
  start();
  }

/* ------------------------------- Cronometro ------------------------------- */

"use strict";
//variáveis de controle do timer 
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

//associa as funções aos seus botões 
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

//inicia o Cronometro 
function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

//pausa o Cronometro mas não limpa as variáveis
function pause() {
  clearInterval(cron);
}



//zera o Cronometro e insere manualmente os valores no HTML
function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

//faz a contagem do tempo e exibição 
function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++; 
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

//se o digito for menor que 10 então concatena com um 0 na frente
function returnData(input) {
  return input >= 10 ? input : `0${input}`
}



