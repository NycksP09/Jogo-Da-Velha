const $switcherBot = document.querySelector('.switcher-bot')

const $boardItem0 = document.querySelector('.board-item-0')
const $boardItem1 = document.querySelector('.board-item-1')
const $boardItem2 = document.querySelector('.board-item-2')
const $boardItem3 = document.querySelector('.board-item-3')
const $boardItem4 = document.querySelector('.board-item-4')
const $boardItem5 = document.querySelector('.board-item-5')
const $boardItem6 = document.querySelector('.board-item-6')
const $boardItem7 = document.querySelector('.board-item-7')
const $boardItem8 = document.querySelector('.board-item-8')

const $boardItemList = document.querySelectorAll('.board-item')

const $score1 = document.querySelector('.score-1')
const $score2 = document.querySelector('.score-2')

const $fieldPlayer1 = document.querySelector('.player-field-1')
const $fieldPlayer2 = document.querySelector('.player-field-2')

const $winnerText = document.querySelector('.winner-text')

const $matchHistoryList =  document.querySelector('.match-history-list')

const $historyMoveList = document.querySelector('.history-move-list')

const line1 = [$boardItem0, $boardItem1, $boardItem2]
const line2 = [$boardItem3, $boardItem4, $boardItem5]
const line3 = [$boardItem6, $boardItem7, $boardItem8]

const column1 = [$boardItem0, $boardItem3, $boardItem6]
const column2 = [$boardItem1, $boardItem4, $boardItem7]
const column3 = [$boardItem2, $boardItem5, $boardItem8]

const diagonal1 = [$boardItem0, $boardItem4, $boardItem8]
const diagonal2 = [$boardItem2, $boardItem4, $boardItem6]

const linesToVerify = [line1, line2, line3, column1, column2, column3, diagonal1, diagonal2]

const $resetButton = document.querySelector('.reset-button')

let currentMove = 'X'
let winner = ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let game = true

function toggleMoveVar(){
  if (currentMove == 'O'){
     currentMove = 'X'
  }  else if (currentMove == 'X') {
      currentMove = 'O'
  }   
  
}

function printMove($boardItem){
  $boardItem.textContent = currentMove 
}

function showWinnerOnBoard(boardItemList){
   for (const lineItem of boardItemList) {
     lineItem.classList.add('won')

     setTimeout(function(){
        lineItem.classList.remove('won')
     }, 1000)
   }
}

function verifyWinner(){
   for (const line of linesToVerify) {
     if (line[0].textContent &&  line[0].textContent == line[1].textContent && line[1].textContent == line[2].textContent) { 
       winner = currentMove
       showWinnerOnBoard(line) 
      }
   }
   const itsFull = checkBoard()

   if(!winner && itsFull) {
     winner = 'draw'
   }
}

function resetBoard() {
   for (let $boardItem of $boardItemList) {
     if($boardItem.textContent) {
        $boardItem.textContent = ''
     }
   }
}

function resetVariables(){
  currentMove = 'X'
  winner = ''
}

function checkBoard(){
   let itsFull = true
   
   for (const $boardItem of $boardItemList) {
     if(!$boardItem.textContent) {
       itsFull = false
     }
  }
  return itsFull
}

function addPoint (player, quantity) {
  if (player === 'X') {
    scorePlayer1 += quantity
  } else if (player === 'O') {
    scorePlayer2 += quantity
  }
}

function printWinnerName () {
  const playerValue = getPlayerName(currentMove)

  $winnerText.textContent = playerValue + ' Ganhou Fiot'
}

function resetGame(){
  $resetButton.addEventListener('click', function(){
     location.reload()  
  })
}

function printPoint() {
  if(scorePlayer1 < 10) {
  $score1.textContent = '0' + scorePlayer1
  }
  else {
    $score1.textContent = scorePlayer1
  }

  if(scorePlayer2 < 10) {
  $score2.textContent = '0' + scorePlayer2
  }
  else {
    $score2.textContent = scorePlayer2
  }
}

function stopGameForAMoment(time){
  game = false
  
  setTimeout(function(){
    game = true
  }, time)
}

function getScenery(){
  const scenery = []
  for(const $boardItem of $boardItemList){
   const move = $boardItem.textContent
   scenery.push(move) 
   console.log($boardItem)
  }
  
  return scenery
}

function printHistoryMatch(){
  const scenery  = getScenery()
  
  const _container = document.createElement('li')
  _container.classList.add('match-history-item')
  
  const _winnerWrapper = document.createElement('div')
  _winnerWrapper.classList.add('winner-wrapper')

  const _title = document.createElement('strong')
  _title.classList.add('winner-history-title')
  _title.classList.add('title--green-small')
  _title.classList.add('title')
  _title.textContent = 'Vencedor'

   const _name = document.createElement('span')
   _name.classList.add('winner-history-name')
   _name.textContent = getPlayerName(winner)

   const _sceneryLabel = document.createElement('span')
   _sceneryLabel.classList.add('scenery-label')
   _sceneryLabel.textContent = 'Cenário'

   const _miniBoard = document.createElement('div')
   _miniBoard.classList.add('mini-board')
   
   _container.appendChild(_winnerWrapper)
   _container.appendChild(_sceneryLabel)
   _container.appendChild(_miniBoard)
   _winnerWrapper.appendChild(_title)
   _winnerWrapper.appendChild(_name)

   console.log(_container)

   $matchHistoryList.appendChild(_container)
   
   for(const move of scenery){
     const _move = document.createElement('span')
     _move.classList.add('mini-board-item')
     _move.textContent = move
     _miniBoard.appendChild(_move)
   }
//   $matchHistoryList.innerHTML += `
//    <li class='match-history-item'>
//       <div class='winner-wrapper'>
//         <strong class='winner-history-title title--green-small title'>Vencedor</strong>
//         <span class='winner-history-name'></span>
//       </div>
//       <span class='scenery-label'>Cenário</span>
//       <div class='mini-board'>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//         <span class='mini-board-item'></span>
//       </div>
//    </li>
//  `

}

function printHistoryMove(move, fieldIndex){
  const playerName = getPlayerName(move)
  
  $historyMoveList.innerHTML +=  `
  <li class='history-move'>
    <span class='history-move-letter'>${move}</span>
    <div class='history-move-text-wrapper'>
      <h3 class='history-move-player-name'>${playerName}</h3>
      <span class='history-move-position-text'>${fieldIndex}</span>
    </div>
  </li>
 `
}

function getPlayerName(playerMove){
  const player1Value = $fieldPlayer1.value
  const player2Value = $fieldPlayer2.value

  if(playerMove === 'X'){
    return player1Value
  } else if(playerMove === 'O') {
    return player2Value
  }
}

function clearElement(className){
  const $element = document.querySelector(className)

  $element.textContent = ''
}

$boardItem0.addEventListener('click', function() {
   if($boardItem0.textContent || !game) return
   printMove($boardItem0)
   verifyWinner()
   printHistoryMove(currentMove, 'Primeiro Campo')
   if(!winner) toggleMoveVar()
   if(winner) {
     stopGameForAMoment(1500)
     setTimeout(resetBoard, 1500)
     setTimeout(function(){
       clearElement('.history-mobe-list')
     })
     addPoint(winner, 1)
     printWinnerName()
     printPoint()
     printHistoryMatch()
     resetVariables()
    }

    
    
})

$boardItem1.addEventListener('click', function() {
  if($boardItem1.textContent || !game) return
  printMove($boardItem1)
  verifyWinner()
  printHistoryMove(currentMove, 'Segundo Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem2.addEventListener('click', function() {
  if($boardItem2.textContent || !game) return
  printMove($boardItem2)
  verifyWinner()
  printHistoryMove(currentMove, 'Terceiro Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem3.addEventListener('click', function() {
  if($boardItem3.textContent || !game) return
  printMove($boardItem3)
  verifyWinner()
  printHistoryMove(currentMove, 'Quarto Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem4.addEventListener('click', function() {
  if($boardItem4.textContent || !game) return
  printMove($boardItem4)
  verifyWinner()
  printHistoryMove(currentMove, 'Quinto Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem5.addEventListener('click', function() {
  if($boardItem5.textContent || !game) return
  printMove($boardItem5)
  verifyWinner()
  printHistoryMove(currentMove, 'Sexto Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem6.addEventListener('click', function() {
  if($boardItem6.textContent || !game) return
  printMove($boardItem6)
  verifyWinner()
  printHistoryMove(currentMove, 'Setimo Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem7.addEventListener('click', function() {
  if($boardItem7.textContent || !game) return
  printMove($boardItem7)
  verifyWinner()
  printHistoryMove(currentMove, 'Oitavo Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$boardItem8.addEventListener('click', function() {
  if($boardItem8.textContent || !game) return
  printMove($boardItem8)
  verifyWinner()
  printHistoryMove(currentMove, 'Nono Campo')
  if(!winner) toggleMoveVar()
  if(winner) {
    stopGameForAMoment(1500)
    setTimeout(resetBoard, 1500)
    setTimeout(function(){
      clearElement('.history-move-list')
    }, 1500)
    addPoint(winner, 1)
    printWinnerName()
    printPoint()
    printHistoryMatch() 
    resetVariables()
   }
   
})

$switcherBot.addEventListener('click', function(){
   $switcherBot.classList.toggle('active')
})
resetGame()
