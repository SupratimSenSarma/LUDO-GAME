let currentPlayer = 1; // 1 for Player 1, 2 for Player 2, 3 for Player 3, 4 for Player 4
let playerPieces = {
  red: { x: 0, hasWon: false },    // Player 1 (Red)
  green: { x: 0, hasWon: false },  // Player 2 (Green)
  yellow: { x: 0, hasWon: false }, // Player 3 (Yellow)
  blue: { x: 0, hasWon: false },   // Player 4 (Blue)
};

const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

// Intro Page Transition
function startGame() {
  document.getElementById("intro-page").style.display = "none";
  document.getElementById("game-board").style.display = "block";
  updatePlayerTurn();
}

// Dice roll logic with emoji and random number
function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  let diceEmoji = "🎲";
  
  // Change emoji based on dice roll
  if (diceValue === 1) diceEmoji = "⚀";
  else if (diceValue === 2) diceEmoji = "⚁";
  else if (diceValue === 3) diceEmoji = "⚂";
  else if (diceValue === 4) diceEmoji = "⚃";
  else if (diceValue === 5) diceEmoji = "⚄";
  else if (diceValue === 6) diceEmoji = "⚅";
  
  document.getElementById("dice-roll").innerText = `You rolled: ${diceValue} ${diceEmoji}`;
  
  // Move piece based on current player and dice value
  const currentColor = getPlayerColor(currentPlayer);
  movePiece(currentColor, diceValue);

  // Check if the current player has won
  if (checkWinner(currentColor)) {
    alert(`${playerNames[currentPlayer - 1]} wins!`);
    resetGame();
    return;
  }

  // Switch turn
  currentPlayer = currentPlayer === 4 ? 1 : currentPlayer + 1;
  updatePlayerTurn();
}

// Move pieces based on dice roll
function movePiece(color, diceValue) {
  const piece = document.getElementById(`${color}-piece`);
  
  // Get current position of the piece
  const currentPosition = playerPieces[color].x;
  const newPosition = currentPosition + (diceValue * 10); // Move piece by a percentage

  // Update piece position
  piece.style.transition = "left 1s ease-in-out";
  piece.style.left = `${newPosition}%`;

  // Update player's position in playerPieces object
  playerPieces[color].x = newPosition > 100 ? 100 : newPosition;  // Prevent out of bounds
}

// Check if a player has won
function checkWinner(color) {
  if (playerPieces[color].x >= 100) {
    playerPieces[color].hasWon = true;
    return true;
  }
  return false;
}

// Reset the game after someone wins
function resetGame() {
  // Reset all positions and states
  for (let color in playerPieces) {
    playerPieces[color].x = 0;
    playerPieces[color].hasWon = false;
    document.getElementById(`${color}-piece`).style.left = "50%";
  }

  // Reset the turn and UI
  currentPlayer = 1;
  updatePlayerTurn();
  document.getElementById("dice-roll").innerText = '';
}

// Update Player Turn Display
function updatePlayerTurn() {
  const playerTurnText = `${playerNames[currentPlayer - 1]}'s turn!`;
  document.getElementById("player-turn").innerText = playerTurnText;
}

// Get the color corresponding to the current player
function getPlayerColor(playerNum) {
  switch (playerNum) {
    case 1: return 'red';
    case 2: return 'green';
    case 3: return 'yellow';
    case 4: return 'blue';
    default: return 'red';
  }
}
