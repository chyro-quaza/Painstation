// game.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let cheatAttempts = 0; // How many times AI cheated
    
    // Create the board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // If cell already taken or game over, ignore
        if (gameState[clickedIndex] !== '' || !gameActive) return;
        
        // Player move
        gameState[clickedIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Check if player won
        if (checkWin()) {
            status.textContent = "YOU HACKED THE SYSTEM!";
            gameActive = false;
            return;
        }
        
        // Check for draw
        if (!gameState.includes('')) {
            status.textContent = "DRAW. SYSTEM STABLE.";
            gameActive = false;
            return;
        }
        
        // AI move (cheating)
        setTimeout(() => makeAIMove(), 500);
    }
    
    function makeAIMove() {
        if (!gameActive) return;
        
        currentPlayer = 'O';
        
        // Check if AI is about to lose
        const almostWin = findAlmostWin('X'); // Player is about to win
        const almostLose = findAlmostWin('O'); // AI is about to lose
        
        let aiMove;
        
        // If AI is about to lose, cheat by changing its last move
        if (almostLose !== -1 && cheatAttempts < 2) {
            const prevMove = gameState.lastIndexOf('O');
            if (prevMove !== -1) {
                gameState[prevMove] = ''; // Erase last move
                document.querySelector(`.cell[data-index="${prevMove}"]`).textContent = '';
                document.querySelector(`.cell[data-index="${prevMove}"]`).classList.remove('o');
                
                aiMove = almostLose; // Block player
                cheatAttempts++;
                status.textContent = "SYSTEM GLITCH DETECTED...";
            }
        } else {
            // Otherwise, play normally (or try to win)
            aiMove = almostWin !== -1 ? almostWin : 
                     almostLose !== -1 ? almostLose : 
                     gameState.indexOf('');
        }
        
        // Make AI move
        gameState[aiMove] = 'O';
        const aiCell = document.querySelector(`.cell[data-index="${aiMove}"]`);
        aiCell.textContent = 'O';
        aiCell.classList.add('o');
        
        // Check if AI won
        if (checkWin()) {
            status.textContent = "AI DOMINATES. YOU LOSE.";
            gameActive = false;
            return;
        }
        
        // Check for draw
        if (!gameState.includes('')) {
            status.textContent = "DRAW. SYSTEM STABLE.";
            gameActive = false;
            return;
        }
        
        currentPlayer = 'X';
        status.textContent = "YOUR MOVE, RUNNER";
    }
    
    // Check if a player is one move away from winning
    function findAlmostWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            // If two in a row and third is empty
            if (gameState[a] === player && gameState[b] === player && gameState[c] === '') return c;
            if (gameState[a] === player && gameState[c] === player && gameState[b] === '') return b;
            if (gameState[b] === player && gameState[c] === player && gameState[a] === '') return a;
        }
        
        return -1;
    }
    
    // Check for win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }
    
    // Reset game
    resetButton.addEventListener('click', () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        cheatAttempts = 0;
        status.textContent = "YOUR MOVE, RUNNER";
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    });
});