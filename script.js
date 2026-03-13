// Game Modal Functions
function openGameModal(game) {
    document.getElementById('gameModal').style.display = 'flex';
    const canvas = document.getElementById('gameCanvas');
    const title = document.getElementById('gameTitle');
    
    // Clear previous game
    canvas.innerHTML = '';
    
    // Load selected game
    if (game === 'whack') {
        title.textContent = 'Hamster Whack';
        loadWhackMole(canvas);
    } else if (game === 'plane') {
        title.textContent = 'Cloud Flying';
        loadFlyingPlane(canvas);
    } else if (game === 'fruit') {
        title.textContent = 'Fruit Matcher';
        loadFruitMatcher(canvas);
    } else if (game === 'runner') {
        title.textContent = 'SpongeBob Runner';
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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ===========================================
// GAME 1: WHACK A MOLE
// ===========================================
function loadWhackMole(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="whackCanvas" width="600" height="300" style="background: #2a5a2a; border-radius: 8px;"></canvas>
            <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem;">
                <p>Score: <span id="score" style="color: #f59e0b; font-size: 24px;">0</span></p>
                <p>Time: <span id="time" style="color: #f59e0b; font-size: 24px;">30</span>s</p>
            </div>
            <p style="color: #f59e0b;">👆 Click on the hamsters to score!</p>
        </div>
    `;
    
    const canvas = document.getElementById('whackCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load hamster image
    const hamsterImg = new Image();
    hamsterImg.src = 'images/hamster.png';
    
    let score = 0;
    let timeLeft = 30;
    let moleX = 0, moleY = 0;
    let gameActive = true;
    let imgLoaded = false;
    
    hamsterImg.onload = function() {
        imgLoaded = true;
        drawGame();
    };
    
    // Draw holes and hamster
    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grass background
        ctx.fillStyle = '#2a5a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw 9 holes (3x3 grid)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let x = 100 + col * 150;
                let y = 50 + row * 80;
                
                // Draw hole (dark brown circle)
                ctx.beginPath();
                ctx.arc(x, y, 35, 0, Math.PI * 2);
                ctx.fillStyle = '#5d3a1a';
                ctx.fill();
                ctx.strokeStyle = '#8b5a2b';
                ctx.lineWidth = 3;
                ctx.stroke();
                
                // Draw hole shadow
                ctx.beginPath();
                ctx.arc(x-5, y-5, 10, 0, Math.PI * 2);
                ctx.fillStyle = '#3d2a0a';
                ctx.fill();
                
                // Draw hamster if this is the active hole and image loaded
                if (row === moleY && col === moleX && gameActive && timeLeft > 0 && imgLoaded) {
                    ctx.drawImage(hamsterImg, x-30, y-40, 60, 50);
                }
            }
        }
        
        requestAnimationFrame(drawGame);
    }
    
    // Click handler
    canvas.addEventListener('click', (e) => {
        if (!gameActive || timeLeft <= 0) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        // Calculate which hole was clicked
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let holeX = 100 + col * 150;
                let holeY = 50 + row * 80;
                
                // Check if click is within this hole
                let distance = Math.sqrt((x - holeX) ** 2 + (y - holeY) ** 2);
                
                // If clicked on the active mole
                if (distance < 40 && row === moleY && col === moleX) {
                    score++;
                    document.getElementById('score').textContent = score;
                    moveMole();
                    return;
                }
            }
        }
    });
    
    // Move hamster to random hole
    function moveMole() {
        moleX = Math.floor(Math.random() * 3);
        moleY = Math.floor(Math.random() * 3);
    }
    
    // Timer
    function startTimer() {
        let timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById('time').textContent = timeLeft;
                
                if (timeLeft === 0) {
                    gameActive = false;
                    alert(`⏰ Game Over! Your score: ${score}`);
                    
                    // Show restart option
                    if (confirm('Play again?')) {
                        score = 0;
                        timeLeft = 30;
                        gameActive = true;
                        document.getElementById('score').textContent = '0';
                        document.getElementById('time').textContent = '30';
                        moveMole();
                    }
                }
            }
        }, 1000);
    }
    
    // Start the game
    moveMole();
    if (imgLoaded) drawGame();
    else hamsterImg.onload = drawGame;
    startTimer();
}

// ===========================================
// GAME 2: FLYING PLANE - Cloud Version
// ===========================================
function loadFlyingPlane(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="planeCanvas" width="600" height="300" style="background: #87CEEB; border-radius: 8px;"></canvas>
            <p style="margin-top: 1rem;">⬆️ Press SPACE to fly | Avoid clouds!</p>
        </div>
    `;
    
    const canvas = document.getElementById('planeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load images
    const planeImg = new Image();
    planeImg.src = 'images/plane.png';
    
    const cloudImg = new Image();
    cloudImg.src = 'images/cloud.png';
    
    const bgImg = new Image();
    bgImg.src = 'images/sky.jpg';
    
    let planeY = 150;
    let velocity = 0;
    let gravity = 0.3;
    let clouds = [];
    let frameCount = 0;
    let gameActive = true;
    let imagesLoaded = 0;
    
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            gameLoop();
            gameUpdate();
        }
    }
    
    planeImg.onload = imageLoaded;
    cloudImg.onload = imageLoaded;
    bgImg.onload = imageLoaded;
    
    function gameLoop() {
        if (!gameActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        if (bgImg.complete) {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        }
        
        // Draw clouds
        clouds.forEach(cloud => {
            ctx.drawImage(cloudImg, cloud.x, cloud.y, 60, 40);
        });
        
        // Draw plane
        if (planeImg.complete) {
            ctx.save();
            ctx.translate(100, planeY);
            ctx.rotate(velocity * 0.05);
            ctx.drawImage(planeImg, -30, -15, 60, 40);
            ctx.restore();
        }
        
        requestAnimationFrame(gameLoop);
    }
    
    // Jump on space
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameActive) {
            velocity = -5;
        }
    });
    
    function gameUpdate() {
        if (!gameActive) return;
        
        // Plane physics
        velocity += gravity;
        planeY += velocity;
        
        // Boundaries
        if (planeY < 20) planeY = 20;
        if (planeY > 260) planeY = 260;
        
        // Spawn clouds
        frameCount++;
        if (frameCount % 40 === 0) {
            clouds.push({
                x: 600,
                y: Math.random() * 200 + 30
            });
        }
        
        // Move clouds and check collision
        clouds.forEach((cloud, index) => {
            cloud.x -= 4;
            
            // Collision detection
            if (cloud.x < 130 && cloud.x > 70 && 
                Math.abs(cloud.y - planeY) < 40) {
                gameActive = false;
                alert('Game Over! You hit a cloud!');
                location.reload(); // Simple restart
            }
            
            // Remove off-screen clouds
            if (cloud.x < -60) {
                clouds.splice(index, 1);
            }
        });
        
        setTimeout(gameUpdate, 30);
    }
}

// ===========================================
// GAME 3: ENDLESS RUNNER - SpongeBob Version
// ===========================================
function loadEndlessRunner(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="runnerCanvas" width="600" height="300" style="background: #1a5f7a; border-radius: 8px;"></canvas>
            <p style="margin-top: 1rem;">⬆️ Press SPACE to jump | Avoid Patrick!</p>
        </div>
    `;
    
    const canvas = document.getElementById('runnerCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load images
    const spongebob = new Image();
    spongebob.src = 'images/spongebob.png';
    
    const patrick = new Image();
    patrick.src = 'images/patrick.png';
    
    const bg = new Image();
    bg.src = 'images/bikini-bottom.jpg';
    
    let playerY = 220;
    let velocity = 0;
    let gravity = 0.5;
    let obstacles = [];
    let frameCount = 0;
    let gameActive = true;
    let score = 0;
    let imagesLoaded = 0;
    
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            drawGame();
            updateGame();
        }
    }
    
    spongebob.onload = imageLoaded;
    patrick.onload = imageLoaded;
    bg.onload = imageLoaded;
    
    function drawGame() {
        if (!gameActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        if (bg.complete) {
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        }
        
        // Draw ground
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(0, 260, canvas.width, 40);
        
        // Draw SpongeBob
        if (spongebob.complete) {
            ctx.drawImage(spongebob, 100, playerY, 40, 40);
        }
        
        // Draw obstacles (Patrick)
        obstacles.forEach(obs => {
            if (patrick.complete) {
                ctx.drawImage(patrick, obs.x, 220, 40, 40);
            }
        });
        
        // Draw score
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 450, 30);
        
        requestAnimationFrame(drawGame);
    }
    
    // Jump on space
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && playerY === 220 && gameActive) {
            velocity = -10;
        }
    });
    
    function updateGame() {
        if (!gameActive) return;
        
        // Player physics
        velocity += gravity;
        playerY += velocity;
        
        if (playerY > 220) {
            playerY = 220;
            velocity = 0;
        }
        
        // Spawn Patrick
        frameCount++;
        if (frameCount % 50 === 0) {
            obstacles.push({ x: 600 });
        }
        
        // Move obstacles and check collision
        obstacles.forEach((obs, index) => {
            obs.x -= 5;
            
            // Collision detection
            if (obs.x < 140 && obs.x > 100 && playerY > 200) {
                gameActive = false;
                alert('Game Over! Patrick got you! Score: ' + score);
                location.reload();
            }
            
            // Remove off-screen and add score
            if (obs.x < -40) {
                obstacles.splice(index, 1);
                score += 10;
            }
        });
        
        setTimeout(updateGame, 30);
    }
}


