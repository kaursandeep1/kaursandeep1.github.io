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
    hamsterImg.src = 'images/whack-a-mole/hamster.png';
    
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
                
                // Draw hole
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
                
                // Draw hamster if this is the active hole
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
        
        // Check which hole was clicked
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let holeX = 100 + col * 150;
                let holeY = 50 + row * 80;
                
                let distance = Math.sqrt((x - holeX) ** 2 + (y - holeY) ** 2);
                
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
// GAME 2: FLYING PLANE
// ===========================================
function loadFlyingPlane(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="planeCanvas" width="600" height="300" style="border-radius: 8px;"></canvas>
            <p style="margin-top: 1rem;">⬆️ Press SPACE to fly | Avoid clouds!</p>
        </div>
    `;
    
    const canvas = document.getElementById('planeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load images
    const planeImg = new Image();
    planeImg.src = 'images/flying-plane/plane.png';
    
    const cloudImg = new Image();
    cloudImg.src = 'images/flying-plane/cloud.png';
    
    const bgImg = new Image();
    bgImg.src = 'images/flying-plane/sky-gd.png';
    
    // Game variables
    let planeY = 150;
    let planeX = 100;
    let planeWidth = 50;
    let planeHeight = 40;
    let velocity = 0;
    let gravity = 0.3;
    let clouds = [];
    let frameCount = 0;
    let gameActive = true;
    let score = 0;
    let imagesLoaded = 0;
    let totalImages = 3;
    
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            drawGame();
            updateGame();
        }
    }
    
    planeImg.onload = imageLoaded;
    cloudImg.onload = imageLoaded;
    bgImg.onload = imageLoaded;
    
    setTimeout(() => {
        if (imagesLoaded < totalImages) {
            drawGame();
            updateGame();
        }
    }, 1000);
    
    function drawGame() {
        if (!gameActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        if (bgImg.complete && bgImg.naturalHeight > 0) {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        }
        
        // Draw clouds
        clouds.forEach(cloud => {
            if (cloudImg.complete && cloudImg.naturalHeight > 0) {
                ctx.drawImage(cloudImg, cloud.x, cloud.y, 60, 40);
            }
        });
        
        // Draw plane
        if (planeImg.complete && planeImg.naturalHeight > 0) {
            ctx.save();
            ctx.translate(planeX + planeWidth/2, planeY + planeHeight/2);
            ctx.rotate(velocity * 0.03);
            ctx.drawImage(planeImg, -planeWidth/2, -planeHeight/2, planeWidth, planeHeight);
            ctx.restore();
        }
        
        // Draw score
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Score: ' + score, 450, 30);
        
        requestAnimationFrame(drawGame);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameActive) {
            velocity = -5;
        }
    });
    
    function updateGame() {
        if (!gameActive) return;
        
        velocity += gravity;
        planeY += velocity;
        
        if (planeY < 20) {
            planeY = 20;
            velocity = 0;
        }
        if (planeY > 240) {
            planeY = 240;
            velocity = 0;
        }
        
        frameCount++;
        if (frameCount % 40 === 0) {
            clouds.push({
                x: 600,
                y: Math.random() * 180 + 30
            });
        }
        
        clouds.forEach((cloud, index) => {
            cloud.x -= 4;
            
            if (cloud.x < planeX + planeWidth && 
                cloud.x + 60 > planeX && 
                cloud.y < planeY + planeHeight && 
                cloud.y + 40 > planeY) {
                gameActive = false;
                alert('💥 Game Over! Score: ' + score);
                
                if (confirm('Play again?')) {
                    location.reload();
                }
            }
            
            if (cloud.x < -70) {
                clouds.splice(index, 1);
                score += 5;
            }
        });
        
        setTimeout(updateGame, 30);
    }
}

// ===========================================
// GAME 3: ENDLESS RUNNER
// ===========================================
function loadEndlessRunner(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="runnerCanvas" width="600" height="300" style="border-radius: 8px;"></canvas>
            <p style="margin-top: 1rem;">⬆️ Press SPACE to jump | Score: <span id="runnerScore" style="color: #f59e0b; font-size: 24px;">0</span></p>
        </div>
    `;
    
    const canvas = document.getElementById('runnerCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load images
    const spongebobImg = new Image();
    spongebobImg.src = 'images/spongebob/spongebob.png';
    
    const rockImg = new Image();
    rockImg.src = 'images/spongebob/rock.png';
    
    const bgImg = new Image();
    bgImg.src = 'images/spongebob/bikini-bottom.png';
    
    // Game variables
    let playerY = 220;
    let playerX = 100;
    let playerWidth = 40;
    let playerHeight = 50;
    let velocity = 0;
    let gravity = 0.5;
    let obstacles = [];
    let frameCount = 0;
    let gameActive = true;
    let score = 0;
    let imagesLoaded = 0;
    let totalImages = 3;
    
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            drawGame();
            updateGame();
        }
    }
    
    spongebobImg.onload = imageLoaded;
    rockImg.onload = imageLoaded;
    bgImg.onload = imageLoaded;
    
    setTimeout(() => {
        if (imagesLoaded < totalImages) {
            drawGame();
            updateGame();
        }
    }, 1000);
    
    function drawGame() {
        if (!gameActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (bgImg.complete && bgImg.naturalHeight > 0) {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        }
        
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(0, 260, canvas.width, 40);
        
        if (spongebobImg.complete && spongebobImg.naturalHeight > 0) {
            ctx.drawImage(spongebobImg, playerX, playerY, playerWidth, playerHeight);
        }
        
        obstacles.forEach(obs => {
            if (rockImg.complete && rockImg.naturalHeight > 0) {
                ctx.drawImage(rockImg, obs.x, 220, 35, 40);
            }
        });
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Score: ' + score, 450, 30);
        
        requestAnimationFrame(drawGame);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && playerY >= 220 && gameActive) {
            velocity = -10;
        }
    });
    
    function updateGame() {
        if (!gameActive) return;
        
        velocity += gravity;
        playerY += velocity;
        
        if (playerY > 220) {
            playerY = 220;
            velocity = 0;
        }
        if (playerY < 100) {
            playerY = 100;
            velocity = 0;
        }
        
        frameCount++;
        if (frameCount % 45 === 0) {
            obstacles.push({ x: 600 });
        }
        
        obstacles.forEach((obs, index) => {
            obs.x -= 5;
            
            if (obs.x < playerX + playerWidth && 
                obs.x + 35 > playerX && 
                playerY + playerHeight > 220) {
                gameActive = false;
                alert('🎮 Game Over! Score: ' + score);
                
                if (confirm('Play again?')) {
                    location.reload();
                }
            }
            
            if (obs.x < -50) {
                obstacles.splice(index, 1);
                score += 10;
                document.getElementById('runnerScore').textContent = score;
            }
        });
        
        setTimeout(updateGame, 30);
    }
}

