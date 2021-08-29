const X_Class = 'x'
const O_Class = 'o'
const win_comb = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningScreen = document.getElementById('win')
const restartbutton = document.getElementById('restart')
const winningTxt = document.querySelector('[winmsg]') 
let oTurn

startGame()

restartbutton.addEventListener('click', startGame)

function startGame(){
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class)
        cell.classList.remove(O_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningScreen.classList.remove('show')
}


function handleClick(e){
   const cell = e.target
   const currentClass = oTurn ? O_Class : X_Class
   placeMark (cell, currentClass)
   if(checkWin(currentClass)){
       endGame(false)
   }
   else if(isDraw()) {
        endGame(true)
   }
   else{
    swapTurns()
    setBoardHoverClass()
   }
   
}
function endGame (draw){
    if(draw){
        winningTxt.innerText = `It's a Draw!` 
    }
    else{
        winningTxt.innerText = ` ${oTurn ? "O" : "X"} is the winner!`
    }
    winningScreen.classList.add('show')
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(O_Class)
    })
} 

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
    
function swapTurns(){
    oTurn = !oTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(O_Class)
    if (oTurn){
         board.classList.add(O_Class)
    } 
    else {
        board.classList.add(X_Class)
    }
}
function checkWin(currentClass){
    return win_comb.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}