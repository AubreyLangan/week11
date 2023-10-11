document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll("td");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[c]) {
                alert(`${gameBoard[a]} wins!`);
                resetGame();
                return true;
            }
        }

        if (gameBoard.every(cell => cell !== "")) {
            alert("It's a draw!");
            resetGame();
        }

        return false;
    }

    function handleMove(cell, cellIndex) {
        if (gameBoard[cellIndex] === "" && !checkWin()) {
            gameBoard[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("used");
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("player-turn").textContent = `Player ${currentPlayer}'s Turn`;
            checkWin();
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("used");
        });
        currentPlayer = "X";
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleMove(cell, index));
    });

    resetButton.addEventListener("click", resetGame);
});