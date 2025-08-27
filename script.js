const board = document.getElementById("board");

function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "light" : "dark");
      square.dataset.row = row;
      square.dataset.col = col;

      // Adiciona peças
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
}


createBoard();
let selectedPiece = null;

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = ""; // Limpa o tabuleiro

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      const isDark = (row + col) % 2 !== 0;
      square.classList.add(isDark ? "dark" : "light");

      // Adiciona peças nas 3 primeiras e últimas linhas
      if (isDark && row < 3) {
        const piece = document.createElement("div");
        piece.classList.add("piece", "black");
        square.appendChild(piece);
      } else if (isDark && row > 4) {
        const piece = document.createElement("div");
        piece.classList.add("piece", "red");
        square.appendChild(piece);
      }

      // Adiciona evento de clique no quadrado
      square.addEventListener("click", () => {
        if (selectedPiece && square.childElementCount === 0) {
          square.appendChild(selectedPiece);
          selectedPiece.style.border = "";
          selectedPiece = null;
        }
      });

      board.appendChild(square);
    }
  }

  // Adiciona evento de clique nas peças
  document.querySelectorAll(".piece").forEach(piece => {
    piece.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que o clique no quadrado seja acionado
      if (selectedPiece) {
        selectedPiece.style.border = "";
      }
      selectedPiece = piece;
      selectedPiece.style.border = "2px solid yellow";
    });
  });
}

createBoard();
