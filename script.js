
let carta1 = {
  id: "zoro",
  anime: "One Piece",
  nome: "Roronoa Zoro",
  imagem:'img/zoro.png',
  atributos: {
    forca: 17,
    poder: 18,
    inteligencia: 4
  }
};

let carta2 = {
  id: "goku",
  anime: "Dragon Ball",
  nome: "Goku",
  imagem:'img/goku.png',
  atributos: {
    forca: 25,
    poder: 30,
    inteligencia: 4
  }
};

let carta3 = {
  id: "agumon",
  anime: "Digimon",
  nome: "Agumon",
  imagem:'img/agumon.png',
  atributos: {
    forca: 10,
    poder: 22 ,
    inteligencia: 3
  }
};

let carta4 = {
  id: "chopper",
  anime: "One Piece",
  nome: "Chopper",
  imagem:'img/chopper.png',
  atributos: {
    forca: 8,
    poder: 13,
    inteligencia: 27
  }
};

let carta5 = {
  id: "luffy",
  anime: "One Piece",
  nome: "Monkey D. Luffy",
  imagem:'img/luffy.png',
  atributos: {
    forca: 20,
    poder: 28,
    inteligencia: 6
  }
};

let carta6 = {
  id: "madara",
  anime: "Naruto",
  nome: "Uchiha Madara",
  imagem:'img/madara.png',
  atributos: {
    forca: 20,
    poder: 28,
    inteligencia: 16
  }
};

let carta7 = {
  id: "gon",
  anime: "Hunter x Hunter",
  nome: "Gon",
  imagem:'img/gon.png',
  atributos: {
    forca: 13,
    poder: 16,
    inteligencia: 19
  }
};

let carta8 = {
  id: "lugia",
  anime: "Pokemon",
  nome: "Lugia",
  imagem:'img/lugia.png',
  atributos: {
    forca: 28,
    poder: 34,
    inteligencia: 10
  }
};

let deckJogador = [carta1, carta2, carta3, carta4];
let deckMaquina = [carta5, carta6, carta7, carta8];
let cartaMaquina;
let cartaJogador;

let numeroCartaMaquina;
let numeroCartaJogador;

setTela();
contarCartas();

function sortearCarta(){

  let quantidadeCartasJogador = deckJogador.length;
  let quantidadeCartasMaquina = deckMaquina.length;
  let blocoAtributos = document.getElementById('selecionarAtributos');
  
  blocoAtributos.style.visibility = "visible";

  numeroCartaMaquina = parseInt(Math.random()*quantidadeCartasMaquina);
  cartaMaquina = deckMaquina[numeroCartaMaquina];

  numeroCartaJogador = parseInt(Math.random()*quantidadeCartasJogador);
  cartaJogador = deckJogador[numeroCartaJogador];

  document.getElementById('btnSortear').disabled = true;
  document.getElementById('btnJogar').disabled = false;

  exibirCartaJogador();

}

function obtemAtributoSelecionado(){

  let grupoRadioAtributo = document.getElementsByName('radioAtributo');
 
  for(let i = 0; i < grupoRadioAtributo.length; i++){

    if(grupoRadioAtributo[i].checked == true){

      return grupoRadioAtributo[i].value;

    }

  }

}

function jogar(){

  let atributoSelecionado = obtemAtributoSelecionado()
  let divResultado = document.getElementById('resultado');
  let valorCartaJogador = cartaJogador.atributos[atributoSelecionado]
  let valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];
  let htmlResultado = '';

  //Verifica se tem algum radiobutton selecionado antes de continuar
  if(atributoSelecionado != undefined){
 
    exibirCartaMaquina();

    if (valorCartaJogador > valorCartaMaquina){

      document.getElementById('divEfeitoCorte').className = "efeitoVitoria";      
      let wiggle = setTimeout(tremerCartaJogador, 2000);
      let animacao = setTimeout(exibirEfeitoCorte, 2000);

      //Retira a carta derrotada e adiciona ao vencedor
      deckMaquina.splice(numeroCartaMaquina,1);
      deckJogador.push(cartaMaquina);

    } else if (valorCartaJogador < valorCartaMaquina){

      document.getElementById('divEfeitoCorte').className = "efeitoDerrota";
      let wiggle = setTimeout(tremerCartaMaquina, 2000);
      let animacao = setTimeout(exibirEfeitoCorte, 2000);

      //Retira a carta derrotada e adiciona ao vencedor
      deckJogador.splice(numeroCartaJogador,1);
      deckMaquina.push(cartaJogador);

    } else{

      let wiggleJogador = setTimeout(tremerCartaJogador, 2000);
      let wiggleMaquina = setTimeout(tremerCartaMaquina, 2000);



    }
    
  } else{

    alert("Selecione um atributo para poder duelar");

  }

  let telaResultado = setTimeout(verificarVencedor,3000);

  divResultado.innerHTML = htmlResultado;
  document.getElementById('btnNovaRodada').style.display = "block";

  let atualizaPlacar = setTimeout(contarCartas, 2000);

}

function exibirCartaJogador(){

  let divCartaJogador = document.getElementById('carta-jogador');
  divCartaJogador.innerHTML = montarCarta(cartaJogador);

}

function exibirCartaMaquina(){
  
  let divCartaMaquina = document.getElementById('carta-maquina');
  divCartaMaquina.innerHTML = montarCarta(cartaMaquina);

}

function montarCarta(carta){
  
  var cartaHTML =
  `<div class="carta">
    <div id="divPersonagem">
      <img class="imgPersonagem" id="${carta.id}" src="${carta.imagem}">
    </div>
    <div class="nome">
        <p class="nome-anime">${carta.anime}</p>
        <p class="nome-personagem">${carta.nome}</p>
    </div>
    <div class="divAtributos">

        <div id="atributo-forca" class="atributo">
            <img class="icon-atributo" src="img/icon-forca.png">
            <p class="valor-atributo" id="valor-atributo-forca">${carta.atributos.forca}</p>
        </div>

        <div id="atributo-poder" class="atributo">
            <img class="icon-atributo" src="img/icon-poder.png">
            <p class="valor-atributo" id="valor-atributo-poder">${carta.atributos.poder}</p>
        </div>

        <div id="atributo-inteligencia" class="atributo">
            <img class="icon-atributo" src="img/icon-inteligencia.png">
            <p class="valor-atributo" id="valor-atributo-inteligencia">${carta.atributos.inteligencia}</p>
        </div>
    </div>

  </div>`

  return cartaHTML;
}

function exibirEfeitoCorte(){

  let hitSound = new Audio('img/slash.wav');

  document.getElementById('btnJogar').disabled = true;

  document.getElementById('divEfeitoCorte').innerHTML += '<img class="hit-effect" src="img/attack2.gif">';
  hitSound.play();


}

function tremerCartaJogador(){
  
  let divCartaMaquina = document.getElementById('carta-maquina');
  divCartaMaquina.style.animation = "shake 0.5s";

}

function tremerCartaMaquina(){

  let divCartaJogador = document.getElementById('carta-jogador');
  divCartaJogador.style.animation = "shake 0.5s";

}

function contarCartas(){

  document.getElementById('quantidadeCartasJogador').innerHTML = deckJogador.length;
  document.getElementById('quantidadeCartasMaquina').innerHTML = deckMaquina.length;

}
    
function verificarVencedor(){
  
  if(deckJogador.length == 0){

    let divContainer = document.getElementById('container');
    divContainer.innerHTML='<p class="resultado-final">VOCÊ PERDEU TODAS AS SUAS CARTAS!</p>';
    divContainer.className = 'tela-derrota';

  } 
  
  if(deckMaquina.length == 0){

    let divContainer = document.getElementById('container');
    divContainer.innerHTML='<p class="resultado-final">VOCÊ GANHOU TODAS AS CARTAS DO OPONENTE!</p>';
    divContainer.className = 'tela-vitoria';

  }

}

function setTela(){

  let valoresPadroes = `<div id="carta-jogador">
  <div class="fundo-cor">
      <img class="question" src="img/question.gif" alt="">
  </div>
</div>
<div id="carta-maquina">
  <div class="fundo-cor">
      <img class="question" src="img/question.gif" alt="">
  </div>
</div>
<div id="divEfeitoCorte" class="efeitoDerrota"></div>
<img id="versus" src="img/vs.png" alt="">`;

  document.querySelector('.wrapper').innerHTML= valoresPadroes;
  document.getElementById('btnSortear').disabled = false;
  document.getElementById('btnNovaRodada').style.display = "none";
  document.getElementById('selecionarAtributos').style.visibility = "hidden";
  document.getElementById('resultado').innerHTML = "";

  let radioAtributos = document.getElementsByName('radioAtributo'); 
  for(let i = 0; i < radioAtributos.length; i++){

    if(radioAtributos[i].checked == true){

      radioAtributos[i].checked = false;

    }

  }

}
