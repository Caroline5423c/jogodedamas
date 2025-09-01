const board = document.getElementById("board");
const turnDisplay = document.getElementById("turn");
let selectedPiece = null;
let currentPlayer = 'red';

function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
      square.dataset.row = row;
      square.dataset.col = col;

      if (square.classList.contains("dark")) {
        if (row < 3) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "black");
          square.appendChild(piece);
        } else if (row > 4) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "red");
          square.appendChild(piece);
        }
      }

      board.appendChild(square);
    }
  }

  addClickEvents();
}

function addClickEvents() {
  document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', () => {
      const piece = square.querySelector('.piece');

      if (piece && !selectedPiece && piece.classList.contains(currentPlayer)) {
        selectedPiece = piece;
        piece.classList.add('selected');
        highlightMoves(square);
      } else if (selectedPiece && square.classList.contains('highlight')) {
        if (square.dataset.capture) {
          const [r, c] = square.dataset.capture.split(',');
          const capturedSquare = document.querySelector(
            `.square[data-row="${r}"][data-col="${c}"]`
          );
          capturedSquare.innerHTML = '';
          delete square.dataset.capture;
        }

        square.appendChild(selectedPiece);
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        clearHighlights();
        switchPlayer();
      } else {
        if (selectedPiece) selectedPiece.classList.remove('selected');
        selectedPiece = null;
        clearHighlights();
      }
    });
  });
}

function highlightMoves(square) {
  clearHighlights();
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const direction = selectedPiece.classList.contains('red') ? -1 : 1;
  const enemyColor = selectedPiece.classList.contains('red') ? 'black' : 'red';

  const simpleMoves = [
    { r: row + direction, c: col - 1 },
    { r: row + direction, c: col + 1 }
  ];

  const captures = [
    { r: row + direction, c: col - 1, jumpR: row + 2 * direction, jumpC: col - 2 },
    { r: row + direction, c: col + 1, jumpR: row + 2 * direction, jumpC: col + 2 }
  ];

  simpleMoves.forEach(move => {
    const target = document.querySelector(
      `.square[data-row="${move.r}"][data-col="${move.c}"]`
    );
    if (target && !target.querySelector('.piece') && target.classList.contains('dark')) {
      target.classList.add('highlight');
    }
  });

  captures.forEach(move => {
    const middle = document.querySelector(
      `.square[data-row="${move.r}"][data-col="${move.c}"]`
    );
    const target = document.querySelector(
      `.square[data-row="${move.jumpR}"][data-col="${move.jumpC}"]`
    );

    if (
      middle &&
      middle.querySelector('.piece') &&
      middle.querySelector('.piece').classList.contains(enemyColor) &&
      target &&
      !target.querySelector('.piece') &&
      target.classList.contains('dark')
    ) {
      target.classList.add('highlight');
      target.dataset.capture = `${move.r},${move.c}`;
    }
  });
}

function clearHighlights() {
  document.querySelectorAll('.highlight').forEach(sq => {
    sq.classList.remove('highlight');
    delete sq.dataset.capture;
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
  turnDisplay.textContent = `Vez do jogador: ${currentPlayer === 'Pink' ? '🔴 Vermelho' : '⚫ light blue'}`;
}

createBoard();
