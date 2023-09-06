// variáveis para os elementos HTML
var P1 = document.querySelector(".player--0");
var P2 = document.querySelector(".player--1");
var P1score = document.getElementById("score--0");
var P2score = document.getElementById("score--1");
var P1Cscore = document.getElementById("current--0");
var P2Cscore = document.getElementById("current--1");
var again = document.querySelector(".btn.btn--new");
var rollDice = document.querySelector(".btn.btn--roll");
var hold = document.querySelector(".btn.btn--hold");

// variáveis de controle de jogo
var turn = false; // variável de controle de turno
var End = false; // variável para controlar o término do jogo

// inicialização das pontuações
P1score.innerHTML = 0;
P2score.innerHTML = 0;

// ocultar a imagem do dado no início
document.querySelector(".dice").classList.add('hidden');

// evento de clique para o botão "Roll"
rollDice.addEventListener('click', () => {
    if (End) return; // se o jogo terminou, não permita mais jogadas

    document.querySelector(".dice").classList.remove('hidden');

    var num = Math.floor(Math.random() * 6 + 1);
    console.log(num);

    document.querySelector(".dice").src = "./dice-" + num + ".png";

    if (num === 1) {
        if (P1.classList.contains("player--active")) {
            P1.classList.remove("player--active");
            P2.classList.add("player--active");
            P1Cscore.innerHTML = "0";
        } else {
            P1.classList.add("player--active");
            P2.classList.remove("player--active");
            P2Cscore.innerHTML = "0";
        }
    }
    else if (P1.classList.contains("player--active")) {
        P1Cscore.innerHTML = parseInt(P1Cscore.innerHTML) + num;

    } else {
        P2Cscore.innerHTML = parseInt(P2Cscore.innerHTML) + num;
    }

});

// evento de clique para o botão "Hold"
hold.addEventListener('click', holdingNum);

function holdingNum() {
    if (End) return; //se o jogo terminou, não permita mais jogadas

    if (P1.classList.contains("player--active")) {
        P1score.innerHTML = parseInt(P1score.innerHTML) + parseInt(P1Cscore.innerHTML);
        P1Cscore.innerHTML = 0;
        P1.classList.remove("player--active");
        P2.classList.add("player--active");

    } else {
        P2score.innerHTML = parseInt(P2score.innerHTML) + parseInt(P2Cscore.innerHTML);
        P2Cscore.innerHTML = 0;
        P1.classList.add("player--active");
        P2.classList.remove("player--active");

    }

    winner(); // verificar se um jogador venceu após cada jogada
}

// evento de clique para o botão "Novo Jogo"
again.addEventListener('click', reset);

function reset() {
    // reiniciar as pontuações e o estado do jogo
    document.querySelector(".dice").classList.add('hidden');
    P1score.innerHTML = 0;
    P2score.innerHTML = 0;
    P1Cscore.innerHTML = 0;
    P2Cscore.innerHTML = 0;
    P1.classList.add("player--active");
    P2.classList.remove("player--active");
    P1.classList.remove("player--winner");
    P2.classList.remove("player--winner");
    End = false; // reiniciar o estado do jogo
}

// função para verificar se um jogador venceu
function winner() {
    if (Number(P1score.innerHTML) >= 100) {
        P1.classList.add("player--winner");
        End = true; // marcar jogo como terminado
    } else if (Number(P2score.innerHTML) >= 100) {
        P2.classList.add("player--winner");
        End = true; // marcar jogo como terminado
    }
}