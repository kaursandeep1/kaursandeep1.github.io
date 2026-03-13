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
// GAME 1: WHACK A MOLE - Hamster Version
// ===========================================
function loadWhackMole(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <canvas id="whackCanvas" width="600" height="300" style="background: #8B4513; border-radius: 8px;"></canvas>
            <div style="margin-top: 1rem;">
                <p>Score: <span id="score">0</span> | Time: <span id="time">30</span>s</p>
                <p style="color: #f59e0b;">Click on hamsters to whack them!</p>
            </div>
        </div>
    `;
    
    const canvas = document.getElementById('whackCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load images
    const hamsterImg = new Image();
    hamsterImg.src = 'images/hamster.png';
    
    const holeImg = new Image();
    holeImg.src = 'images/hole.png';
    
    let score = 0;
    let timeLeft = 30;
    let moleX = 0, moleY = 0;
    let imagesLoaded = 0;
    
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            drawGame();
            startGame();
        }
    }
    
    hamsterImg.onload = imageLoaded;
    holeImg.onload = imageLoaded;
    
    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw holes and hamsters
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Draw hole
                ctx.drawImage(holeImg, 50 + i*180, 20 + j*90, 100, 70);
                
                // Draw hamster if active
                if (i === moleX && j === moleY && timeLeft > 0) {
                    ctx.drawImage(hamsterImg, 70 + i*180, 10 + j*90, 60, 60);
                }
            }
        }
        
        requestAnimationFrame(drawGame);
    }
    
    // Click detection
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if clicked on active hamster
        let hamsterX = 70 + moleX*180;
        let hamsterY = 10 + moleY*90;
        
        if (x > hamsterX && x < hamsterX + 60 && 
            y > hamsterY && y < hamsterY + 60 && timeLeft > 0) {
            score++;
            document.getElementById('score').textContent = score;
            moveHamster();
        }
    });
    
    function moveHamster() {
        moleX = Math.floor(Math.random() * 3);
        moleY = Math.floor(Math.random() * 3);
    }
    
    function startGame() {
        // Move hamster every second
        setInterval(moveHamster, 800);
        
        // Timer
        let timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById('time').textContent = timeLeft;
                if (timeLeft === 0) {
                    alert(`Game Over! Your score: ${score}`);
                }
            }
        }, 1000);
    }
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

