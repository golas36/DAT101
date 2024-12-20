const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Game variables
let bird, pipes, score, gameOver, frames;

function initializeGame() {
    bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.8, lift: -10, velocity: 0 };
    pipes = [];
    score = 0;
    gameOver = false;
    frames = 0;
}

function startCountdown() {
    let countdown = 3;

    const countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText(countdown, canvas.width / 2 - 10, canvas.height / 2);

        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    initializeGame();
    startButton.style.display = 'none'; // Hide the start button
    gameLoop();
}

startButton.addEventListener('click', startCountdown);

document.addEventListener('keydown', () => {
    if (!gameOver) {
        bird.velocity = bird.lift;
    }
});

// Game loop
function gameLoop() {
    if (gameOver) {
        startButton.style.display = 'block'; // Show the start button when game ends
        return;
    }

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
        const pipeTopHeight = Math.random() * (canvas.height - 120 - 50) + 20;
        pipes.push({ x: canvas.width, top: pipeTopHeight, bottom: pipeTopHeight + 120 });
    }

    pipes.forEach((pipe, index) => {
        pipe.x -= 2;

        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, 50, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height - pipe.bottom);

        // Check collision
        if (
            bird.x < pipe.x + 50 &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
        ) {
            endGame();
        }

        // Remove pipes and update score
        if (pipe.x + 50 < 0) {
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