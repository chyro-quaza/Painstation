document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let cheatAttempts = 0;
    let lastAIMove = null;

    // Initialize the board
    function initBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cheatAttempts = 0;
        lastAIMove = null;
        currentPlayer = 'X';
        status.textContent = "YOUR MOVE, RUNNER";
    }

    // Start the game immediately
    initBoard();

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedIndex] !== '' || !gameActive || currentPlayer !== 'X') return;
        
        makeMove(clickedIndex, 'X');
        
        if (checkWin('X')) {
            status.textContent = "YOU HACKED THE SYSTEM!";
            gameActive = false;
            return;
        }
        
        if (isDraw()) {
            status.textContent = "DRAW. SYSTEM STABLE.";
            gameActive = false;
            return;
        }
        
        currentPlayer = 'O';
        status.textContent = "AI PROCESSING...";
        setTimeout(makeAIMove, 800);
    }
    
    function makeAIMove() {
        if (!gameActive) return;
        
        // First check if AI can win
        let move = findWinningMove('O');
        
        // If not, check if player can win (to block)
        if (move === -1) move = findWinningMove('X');
        
        // If neither, use cheating logic
        if (move === -1 && cheatAttempts < 2 && lastAIMove !== null) {
            // Only cheat if we're about to lose and haven't cheated too much
            const playerAboutToWin = findWinningMove('X');
            if (playerAboutToWin !== -1) {
                // Undo last move
                gameState[lastAIMove] = '';
                document.querySelector(`.cell[data-index="${lastAIMove}"]`).textContent = '';
                document.querySelector(`.cell[data-index="${lastAIMove}"]`).classList.remove('o');
                
                // Make the blocking move instead
                move = playerAboutToWin;
                cheatAttempts++;
                status.textContent = "SYSTEM GLITCH DETECTED...";
                document.getElementById('status').classList.add('glitch');
                setTimeout(() => {
                    document.getElementById('status').classList.remove('glitch');
                }, 1000);
            }
        }
        
        // If still no move, pick random
        if (move === -1) {
            const emptyCells = gameState.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
            move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
        
        makeMove(move, 'O');
        lastAIMove = move;
        
        if (checkWin('O')) {
            status.textContent = "AI DOMINATES. YOU LOSE.";
            gameActive = false;
            return;
        }
        
        if (isDraw()) {
            status.textContent = "DRAW. SYSTEM STABLE.";
            gameActive = false;
            return;
        }
        
        currentPlayer = 'X';
        status.textContent = "YOUR MOVE, RUNNER";
    }
    
    function makeMove(index, player) {
        gameState[index] = player;
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
    }
    
    function findWinningMove(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameState[a] === player && gameState[b] === player && gameState[c] === '') return c;
            if (gameState[a] === player && gameState[c] === player && gameState[b] === '') return b;
            if (gameState[b] === player && gameState[c] === player && gameState[a] === '') return a;
        }
        return -1;
    }
    
    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return gameState[index] === player;
            });
        });
    }
    
    function isDraw() {
        return !gameState.includes('') && !checkWin('X') && !checkWin('O');
    }
    
    resetButton.addEventListener('click', initBoard);
});