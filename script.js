
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells = [];
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleCellClick(e) {
    if (!gameActive) return;
    let cell = e.target;
    if (cell.textContent !== "") return;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "x" : "o");
    if (checkWin()) {
        message.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    if (cells.every(cell => cell.textContent !== "")) {
        message.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        let [a, b, c] = pattern;
        return cells[a].textContent !== "" &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

restartBtn.addEventListener("click", () => {
    gameActive = true;
    currentPlayer = "X";
    message.textContent = "";
    createBoard();
});

createBoard();
