let cells = document.querySelectorAll(".cell");
let currentPlayer = "O";
let boardStatus = {};
let winMessage = document.querySelector("p");
let replayButton = document.querySelector(".replay");

// Function to handle the click event on each cell
function handleCellClick(cell) {
  if (cell.textContent === "" && !winMessage.textContent) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class based on player
    boardStatus[cell.id] = currentPlayer;
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    decideWinner();
  }
}

// Function to decide the winner
function decideWinner() {
  if (checkWinner("O")) {
    winMessage.textContent = "Player O wins!";
    showReplayButton();
  } else if (checkWinner("X")) {
    winMessage.textContent = "Player X wins!";
    showReplayButton();
  }
}

// Function to check for a winner (either "O" or "X")
function checkWinner(player) {
  const winPatterns = [
    // Row combinations
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // Column combinations
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // Diagonal combinations
    [1, 5, 9],
    [3, 5, 7],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => boardStatus[index] === player)
  );
}

// Function to show the replay button
function showReplayButton() {
  replayButton.style.display = "block";
}

// Function to reset the game
function resetGame() {
  // Clear the board
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("O", "X");
  });

  // Reset the game state
  boardStatus = {};
  currentPlayer = "O";
  winMessage.textContent = "";
  replayButton.style.display = "none";

  // Re-enable clickability for the cells
  cells.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(cell));
  });
}

// Set up event listeners for each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

// Add event listener for the replay button
replayButton.addEventListener("click", resetGame);