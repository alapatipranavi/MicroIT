const board = document.getElementById("board");
const status = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill("");

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => makeMove(index));
    board.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (cells[index] !== "" || checkWinner()) return;
  cells[index] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
  } else if (!cells.includes("")) {
    status.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],  // rows
    [0,3,6],[1,4,7],[2,5,8],  // columns
    [0,4,8],[2,4,6]           // diagonals
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  drawBoard();
}

drawBoard();
