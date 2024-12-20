const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.8, lift: -10, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

// Pipe dimensions
const pipeWidth = 50;
const pipeGap = 120;

// Controls
document.addEventListener('keydown', () => {
    if (!gameOver) {
        bird.velocity = bird.lift;
    }
});

// Game loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame();
    }

    // Draw bird
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Update and draw pipes
    if (frames % 100 === 0) {
        const pipeTopHeight = Math.random() * (canvas.height - pipeGap - 50) + 20;
        pipes.push({ x: canvas.width, top: pipeTopHeight, bottom: pipeTopHeight + pipeGap });
    }

    pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);

        // Check collision
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
        ) {
            endGame();
        }

        // Remove pipes and update score
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 25);

    frames++;
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameOver = true;
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
}

let frames = 0;
gameLoop();