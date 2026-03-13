// Game Modal Functions
function openGameModal(game) {
    document.getElementById('gameModal').style.display = 'flex';
    const canvas = document.getElementById('gameCanvas');
    const title = document.getElementById('gameTitle');
    
    // Clear previous game
    canvas.innerHTML = '';
    
    // Load selected game
    if (game === 'whack') {
        title.textContent = 'Whack a Mole';
        loadWhackMole(canvas);
    } else if (game === 'plane') {
        title.textContent = 'Flying a Plane';
        loadFlyingPlane(canvas);
    } else if (game === 'fruit') {
        title.textContent = 'Fruit Matcher';
        loadFruitMatcher(canvas);
    } else if (game === 'runner') {
        title.textContent = 'Endless Runner';
        loadEndlessRunner(canvas);
    }
}

function closeGameModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        closeGameModal();
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// GAME 1: Whack a Mole
function loadWhackMole(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="whackCanvas" width="600" height="300" style="background: #2a3f2a; border-radius: 8px;"></canvas>
            <div style="margin-top: 1rem;">
                <p>Score: <span id="score">0</span> | Time: <span id="time">30</span>s</p>
            </div>
        </div>
    `;
    
    const canvas = document.getElementById('whackCanvas');
    const ctx = canvas.getContext('2d');
    let score = 0;
    let timeLeft = 30;
    let moleX = 0, moleY = 0;
    
    function drawMole() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw holes
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                ctx.arc(100 + i*200, 50 + j*100, 40, 0, Math.PI*2);
                ctx.fillStyle = '#4a3f2a';
                ctx.fill();
                ctx.strokeStyle = '#8b6b4a';
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        }
        
        // Draw mole
        if (timeLeft > 0) {
            ctx.beginPath();
            ctx.arc(100 + moleX*200, 50 + moleY*100, 30, 0, Math.PI*2);
            ctx.fillStyle = '#8b5a2b';
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(80 + moleX*200, 30 + moleY*100, 5, 0, Math.PI*2);
            ctx.arc(120 + moleX*200, 30 + moleY*100, 5, 0, Math.PI*2);
            ctx.fill();
        }
    }
    
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 60 + moleX*200 && x < 140 + moleX*200 && y > 20 + moleY*100 && y < 80 + moleY*100) {
            score++;
            document.getElementById('score').textContent = score;
            moveMole();
        }
    });
    
    function moveMole() {
        moleX = Math.floor(Math.random() * 3);
        moleY = Math.floor(Math.random() * 3);
        drawMole();
    }
    
    function gameTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time').textContent = timeLeft;
            if (timeLeft === 0) {
                alert(`Game Over! Your score: ${score}`);
            }
        }
    }
    
    setInterval(moveMole, 1000);
    setInterval(gameTimer, 1000);
    drawMole();
}

// GAME 2: Flying Plane (Simplified)
function loadFlyingPlane(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="planeCanvas" width="600" height="300" style="background: #87CEEB; border-radius: 8px;"></canvas>
            <p style="margin-top: 1rem;">Use SPACE to fly up</p>
        </div>
    `;
    
    const canvas = document.getElementById('planeCanvas');
    const ctx = canvas.getContext('2d');
    let planeY = 150;
    let gravity = 0.5;
    let velocity = 0;
    let obstacles = [];
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw plane
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(100, planeY);
        ctx.lineTo(120, planeY-10);
        ctx.lineTo(140, planeY-5);
        ctx.lineTo(160, planeY);
        ctx.lineTo(140, planeY+5);
        ctx.lineTo(120, planeY+10);
        ctx.closePath();
        ctx.fill();
        
        // Draw obstacles
        ctx.fillStyle = '#654321';
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, 0, 20, obs.gapY);
            ctx.fillRect(obs.x, obs.gapY + 100, 20, canvas.height);
        });
        
        requestAnimationFrame(draw);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            velocity = -8;
        }
    });
    
    function update() {
        velocity += gravity;
        planeY += velocity;
        
        if (planeY < 0) planeY = 0;
        if (planeY > canvas.height) planeY = canvas.height;
        
        obstacles.forEach(obs => obs.x -= 3);
        
        setTimeout(update, 50);
    }
    
    draw();
    update();
}

// GAME 3: Fruit Matcher (Simplified)
function loadFruitMatcher(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <p>Fruit Matcher - Click cells to swap</p>
            <div style="display: grid; grid-template-columns: repeat(3, 80px); gap: 5px; justify-content: center;">
                <div class="fruit-cell" style="width:80px;height:80px;background:#ff6b6b;border-radius:8px;">🍎</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#4ecdc4;border-radius:8px;">🍊</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#ffe66d;border-radius:8px;">🍌</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#ff6b6b;border-radius:8px;">🍊</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#4ecdc4;border-radius:8px;">🍎</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#ffe66d;border-radius:8px;">🍌</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#ff6b6b;border-radius:8px;">🍌</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#4ecdc4;border-radius:8px;">🍎</div>
                <div class="fruit-cell" style="width:80px;height:80px;background:#ffe66d;border-radius:8px;">🍊</div>
            </div>
            <p style="margin-top: 1rem;">Score: 0</p>
        </div>
    `;
// GAME 4: Endless Runner WITH IMAGES
function loadEndlessRunner(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary); position: relative;">
            <canvas id="runnerCanvas" width="600" height="300" style="background: #87CEEB; border-radius: 8px;"></canvas>
            <p style="margin-top: 1rem;">⬆️ Press SPACE to jump | Score: <span id="runnerScore">0</span></p>
        </div>
    `;
    
    const canvas = document.getElementById('runnerCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load images
    const playerImg = new Image();
    playerImg.src = 'images/player.png';
    
    const obstacleImg = new Image();
    obstacleImg.src = 'images/obstacle.png';
    
    const bgImg = new Image();
    bgImg.src = 'images/game-bg.png';
    
    // Game variables
    let playerY = 250;
    let velocity = 0;
    let gravity = 0.5;
    let score = 0;
    let gameRunning = true;
    
    // Obstacles array
    let obstacles = [];
    let frameCount = 0;
    
    // Wait for images to load
    let imagesLoaded = 0;
    
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            // Start game when all images loaded
            draw();
            update();
        }
    }
    
    playerImg.onload = imageLoaded;
    obstacleImg.onload = imageLoaded;
    bgImg.onload = imageLoaded;
    
    function draw() {
        if (!gameRunning) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        if (bgImg.complete) {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        } else {
            // Fallback color
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Draw ground
        ctx.fillStyle = '#4a3f2a';
        ctx.fillRect(0, 280, canvas.width, 20);
        
        // Draw player
        if (playerImg.complete) {
            ctx.drawImage(playerImg, 100, playerY, 30, 30);
        } else {
            // Fallback
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(100, playerY, 20, 30);
        }
        
        // Draw obstacles
        obstacles.forEach(obs => {
            if (obstacleImg.complete) {
                ctx.drawImage(obstacleImg, obs.x, 250, 25, 30);
            } else {
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(obs.x, 250, 20, 30);
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    // Jump on space
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && playerY === 250 && gameRunning) {
            velocity = -10;
        }
    });
    
    function update() {
        if (!gameRunning) return;
        
        // Player physics
        velocity += gravity;
        playerY += velocity;
        
        if (playerY > 250) {
            playerY = 250;
            velocity = 0;
        }
        
        // Spawn obstacles
        frameCount++;
        if (frameCount % 60 === 0) { // Every ~2 seconds at 30fps
            obstacles.push({
                x: 600,
                width: 25
            });
        }
        
        // Move obstacles
        obstacles.forEach((obs, index) => {
            obs.x -= 5;
            
            // Check collision
            if (obs.x < 120 && obs.x > 80 && playerY > 230) {
                gameOver();
            }
            
            // Remove off-screen obstacles and increase score
            if (obs.x < -50) {
                obstacles.splice(index, 1);
                score += 10;
                document.getElementById('runnerScore').textContent = score;
            }
        });
        
        setTimeout(update, 30);
    }
    
    function gameOver() {
        gameRunning = false;
        alert(`Game Over! Your score: ${score}`);
        
        // Restart option
        if (confirm('Play again?')) {
            playerY = 250;
            velocity = 0;
            score = 0;
            obstacles = [];
            frameCount = 0;
            gameRunning = true;
            document.getElementById('runnerScore').textContent = '0';
            update();
        }
    }
}
