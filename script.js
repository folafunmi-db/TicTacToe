// 1. Basic Setup
// 2. Determine winner
// 3. Basic AI and winner Notification
// 4. Minimax algorithm

var origBoard; //an array that keeps track of what is on the board
const huPlayer = 'O';
const aiPlayer = 'X';

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    //what will happen when the game starts; at the beginning and at replay
    document.querySelector('.endgame').style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    //switches turns after a slot is selected
    console.log(square.target.id);
    turn(square.target.id, huPlayer);
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        //to check if the player has played in all the spots that constitute a win
        if (win.every(elem => plays.indexOf(elem > -1))) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}