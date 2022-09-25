
const alphabet = ['A','B','C','Ç','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
'a','b','c','ç','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const canvas = document.getElementById('hangman')
const tabuleiro = canvas.getContext('2d')
let listaPalavras = ["ALURA", "ORACLE"]
let palavraSecreta = ""

// escolhe nova palavra do botão nova palavra
function novaPalavra() {
  listaPalavras = [document.querySelector('.input-keyword').value.toUpperCase()]

  newKeyword.classList.add('hide')
  gameCanvas.classList.remove('hide')
  
  escolherPalavra()
  desenharCanvas()
  desenhaLinhas()
  desenhaForca()
  desenhaLetras()
}

// escolhe a palavra secreta
function escolherPalavra() {
  let palavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)]
  palavraSecreta = palavra
  console.log(palavraSecreta)
}

// Desenha o canvas com cor de fundo
function desenharCanvas() {
  tabuleiro.lineWidth = 8
  tabuleiro.lineCap = 'round'
  tabuleiro.lineJoin = 'round'
  tabuleiro.fillStyle = '#e6ebfd'

  //manipulation
  tabuleiro.fillRect(0, 0, 1200, 800)
}

// Desenha linha de acordo com o numero de letras
function desenhaLinhas() {
  tabuleiro.beginPath()
  tabuleiro.lineWidth = 6
  tabuleiro.lineCap = 'round'
  tabuleiro.lineJoin = 'round'
  tabuleiro.strokeStyle = '#0A4871'

  let largura = 600/palavraSecreta.length
  for(let i = 0; i < palavraSecreta.length; i++) {
    tabuleiro.moveTo(320+(largura*i), 540)
    tabuleiro.lineTo(390+(largura*i), 540)
  }

  tabuleiro.stroke()
  tabuleiro.closePath()
}

// Desenha letra de acordo com a letra apertada

function desenhaLetrasCertas(linha, fonte, cor) {
  preencha = (ctx, x, y) => {
    tabuleiro.fillText(ctx, x, y)
  }
  tabuleiro.lineWidth = linha 
  tabuleiro.font = fonte
  tabuleiro.fillStyle = cor
}

function desenhaLetraExiste() {
  desenhaLetrasCertas(2, '20px Inter', '#FF0000')
  preencha("LETRA JÁ DIGITADA!", 1000, 300)
  setTimeout(() => {
    desenhaLetrasCertas(2, '20px Inter', '#e6ebfd')
    tabuleiro.beginPath()
    tabuleiro.lineWidth = 8
    tabuleiro.lineCap = 'round'
    tabuleiro.lineJoin = 'round'
    tabuleiro.fillStyle = '#e6ebfd'
    //manipulation
    tabuleiro.fillRect(1000, 270, 200, 50)
    tabuleiro.closePath()
  }, 1000)
}

function desenhaForca() {
  tabuleiro.lineWidth = 4
  tabuleiro.lineCap = 'round'
  tabuleiro.lineJoin = 'round'
  tabuleiro.strokeStyle = '#0A4871'
  tabuleiro.fillStyle = '#0A4871'

  suporte = () => { 
    tabuleiro.beginPath()
    tabuleiro.moveTo(550, 400)
    tabuleiro.lineTo(550, 40)
    tabuleiro.stroke()
    tabuleiro.closePath()

    tabuleiro.beginPath()
    tabuleiro.moveTo(450, 400)
    tabuleiro.lineTo(800, 400)
    tabuleiro.stroke()
    tabuleiro.closePath()

    tabuleiro.beginPath()
    tabuleiro.moveTo(550, 40)
    tabuleiro.lineTo(700, 40)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  corda = () => {
    tabuleiro.beginPath()
    tabuleiro.moveTo(700, 40)
    tabuleiro.lineTo(700, 90)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  cabeca = () => {
    tabuleiro.beginPath()
    tabuleiro.arc(700, 123, 30, 0, 2*Math.PI)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  tronco = () => {
    tabuleiro.beginPath()
    tabuleiro.moveTo(700, 153)
    tabuleiro.lineTo(700, 300)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  pernaEsquerda = () => {
    tabuleiro.beginPath()
    tabuleiro.moveTo(700, 300)
    tabuleiro.lineTo(663, 363)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  pernaDireita = () => {
    tabuleiro.beginPath()
    tabuleiro.moveTo(700, 300)
    tabuleiro.lineTo(733, 363)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  bracoEsquerdo = () => {
    tabuleiro.beginPath()
    tabuleiro.moveTo(700, 153)
    tabuleiro.lineTo(663, 213)
    tabuleiro.stroke()
    tabuleiro.closePath()
  },
  bracoDireito = () => {
    tabuleiro.beginPath()
    tabuleiro.moveTo(700, 153)
    tabuleiro.lineTo(733, 213)
    tabuleiro.stroke()
    tabuleiro.closePath()
  }
  console.log()
}


function desenhaDerrota() {
  desenhaLetrasCertas(8, '100px Inter', '#FF0000')
  preencha("VOCÊ PERDEU", 250, 400)
}

function desenhaVitoria() {
  desenhaLetrasCertas(8, '100px Inter', '#00FF00')
  preencha("VOCÊ VENCEU!", 250, 400)
}

function limpaTela() {
  tabuleiro.clearRect(0, 0, 1200, 800)
}

function desenhaLetras() {

    let separaLetras = palavraSecreta.split('')
    let controle = 8
    let letrasApertadas = []
    
    
    document.addEventListener('keyup', (Event) => {
      
      let teclaApertada = Event.key.toUpperCase()
      let x = 600/separaLetras.length
      let validacaoLetras = separaLetras.includes(teclaApertada)
      let validacaoAlfabeto = alphabet.includes(teclaApertada)
      
      if(validacaoLetras == false && validacaoAlfabeto == true && controle > 0) {
        
        if(letrasApertadas.includes(teclaApertada)) {
          return desenhaLetraExiste()
        }

        letrasApertadas.push(teclaApertada)
        controle--

        if(controle <= 0) {
          return limpaTela(), desenhaDerrota(), derrota = setTimeout(() => {
            window.location.reload()
          }, 2000) 
        }
        desenhaLetrasCertas(2, '40px Inter', '#808080')
        preencha(teclaApertada, 200+(x*controle), 600)

        switch(letrasApertadas.length) {
          case 1:
            suporte()
            break
          case 2:
            corda()
            break
          case 3:
            cabeca()
            break
          case 4:
            tronco()
            break
          case 5:
            pernaEsquerda()
            break
          case 6:
            pernaDireita()
            break
          case 7:
            bracoEsquerdo()
            break
          case 8:
            bracoDireito()
            break
        }
        console.log("letras")

        console.log(controle)
      }

      for(let i = 0; i < separaLetras.length; i++) {
          
        if(teclaApertada == separaLetras[i]) {
          
          desenhaLetrasCertas(8, '66px Inter', '#0A4871')
          preencha(separaLetras[i], 338+(x*i), 524)
          delete separaLetras[i]

          if(Object.entries(separaLetras).length == 0) {
            return limpaTela(), desenhaVitoria(), derrota = setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
          teclaApertada--

        }
      }
    })
  
}




const gameMenu = document.querySelector('.menu')
const gameCanvas = document.querySelector('.show-hangman')
const newKeyword = document.querySelector('.newkeyword-wrapper') 

const buttonStart = document.querySelector('.start-game')
const buttonStartNew = document.querySelector('.new-game')
const buttonNewKeyword = document.querySelector('.add-keyword')
const buttonSaveNewKeyword = document.querySelector('.save-start')
const buttonGiveup = document.querySelector('.give-up')
const buttonCancelKword = document.querySelector('.cancel')


function startGame() {
  gameMenu.classList.add('hide')
  gameCanvas.classList.remove('hide')

  escolherPalavra()
  desenharCanvas()
  desenhaLinhas()
  desenhaForca()
  desenhaLetras()
  
}

function addNewKeyword() {
  gameMenu.classList.add('hide')
  newKeyword.classList.remove('hide')
}

function giveUp() {
  gameCanvas.classList.add('hide')
  gameMenu.classList.remove('hide')
}

function cancelNewKword() {
  newKeyword.classList.add('hide')
  gameMenu.classList.remove('hide')
}


// start game
buttonStart.addEventListener('click', () => {
  startGame()
})

// new game
buttonStartNew.addEventListener('click', () => {
  startGame()
})


// add a new word to the game
buttonNewKeyword.addEventListener('click', () => {
  addNewKeyword()
})

buttonSaveNewKeyword.addEventListener('click', () => {
  novaPalavra()
})

// return to start menu
buttonGiveup.addEventListener('click', () => {
  giveUp()
  window.location.reload() //placeholder
})

buttonCancelKword.addEventListener('click', () => {
  cancelNewKword()
})