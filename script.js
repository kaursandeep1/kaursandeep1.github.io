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
// GAME 1: WHACK A MOLE - FIXED
// ===========================================
// ===========================================
// GAME 1: HAMSTER PICKER - PERFECTLY PLACED
// ===========================================
function loadWhackMole(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary); width: 100%;">
            <h2 style="color: #f59e0b; margin-bottom: 5px;">🐹 Hamster Picker</h2>
            <p style="margin-bottom: 10px;">Click the hamsters to score!</p>
            <div style="margin-bottom: 10px;">
                <span style="font-size: 20px;">Score: </span>
                <span id="hamsterScore" style="color: #f59e0b; font-size: 28px; font-weight: bold;">0</span>
            </div>
            
            <div style="display: flex; justify-content: center; width: 100%;">
                <div style="position: relative; width: 500px; height: 250px; background-color: #E7E08B; border-radius: 15px; margin: 0 auto;">
                    
                    <!-- Hole 1 - Left -->
                    <div style="position: absolute; left: 80px; top: 70px; width: 100px; height: 100px;">
                        <!-- Dirt/Hole at bottom -->
                        <div style="position: absolute; left: 10px; bottom: 5px; width: 80px; height: 25px; background-color: #8B4513; border-radius: 0 0 40px 40px; z-index: 2;"></div>
                        <!-- Hamster (starts hidden in hole) -->
                        <img id="hamster1" class="hamster-img" src="images/whack-a-mole/hamster.png" 
                             style="position: absolute; left: 20px; bottom: 5px; width: 60px; height: 60px; cursor: pointer; z-index: 3; transition: bottom 0.2s;">
                    </div>
                    
                    <!-- Hole 2 - Middle -->
                    <div style="position: absolute; left: 200px; top: 40px; width: 100px; height: 100px;">
                        <div style="position: absolute; left: 10px; bottom: 5px; width: 80px; height: 25px; background-color: #8B4513; border-radius: 0 0 40px 40px; z-index: 2;"></div>
                        <img id="hamster2" class="hamster-img" src="images/whack-a-mole/hamster.png" 
                             style="position: absolute; left: 20px; bottom: 5px; width: 60px; height: 60px; cursor: pointer; z-index: 3; transition: bottom 0.2s;">
                    </div>
                    
                    <!-- Hole 3 - Right -->
                    <div style="position: absolute; left: 320px; top: 100px; width: 100px; height: 100px;">
                        <div style="position: absolute; left: 10px; bottom: 5px; width: 80px; height: 25px; background-color: #8B4513; border-radius: 0 0 40px 40px; z-index: 2;"></div>
                        <img id="hamster3" class="hamster-img" src="images/whack-a-mole/hamster.png" 
                             style="position: absolute; left: 20px; bottom: 5px; width: 60px; height: 60px; cursor: pointer; z-index: 3; transition: bottom 0.2s;">
                    </div>
                </div>
            </div>
        </div>
    `;

    // Game logic
    let score = 0;
    const scoreDisplay = document.getElementById('hamsterScore');
    const hamsters = document.querySelectorAll('.hamster-img');
    
    // Hide all hamsters initially (push them down)
    hamsters.forEach(hamster => {
        hamster.style.bottom = '-30px'; // Hidden in hole
    });
    
    // Function to pop up a random hamster
    function popRandomHamster() {
        const randomIndex = Math.floor(Math.random() * hamsters.length);
        const hamster = hamsters[randomIndex];
        
        // Only pop if it's hidden
        if (hamster.style.bottom === '-30px') {
            hamster.style.bottom = '15px'; // Pop up above hole
            
            // Set timer to hide again
            setTimeout(() => {
                hamster.style.bottom = '-30px'; // Hide back in hole
            }, 800 + Math.random() * 700);
        }
    }
    
    // Click handler for each hamster
    hamsters.forEach(hamster => {
        hamster.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Only count if hamster is visible (popped up)
            if (this.style.bottom === '15px') {
                score++;
                scoreDisplay.textContent = score;
                
                // Hide immediately when clicked
                this.style.bottom = '-30px';
            }
        });
    });
    
    // Pop hamsters at random intervals
    setInterval(popRandomHamster, 600);
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
// GAME 3: ENDLESS RUNNER - COMPLETELY FIXED
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
    let playerY = 200; // Ground level
    let playerX = 100;
    let playerWidth = 70;
    let playerHeight = 85;
    let velocity = 0;
    let gravity = 0.6;
    
    // Only ONE rock at a time
    let currentRock = null;
    let rockActive = false;
    let rockSpawnTimer = 0;
    
    let gameActive = true;
    let score = 0;
    let imagesLoaded = 0;
    let totalImages = 3;
    let frameCount = 0;
    
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
    
    // Fallback if images take too long
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
        
        // Draw SAND GROUND at y=270
        ctx.fillStyle = '#f5e5c0';
        ctx.fillRect(0, 270, canvas.width, 30);
        
        // Add sand texture
        ctx.fillStyle = '#d2b48c';
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.arc(i * 40, 285, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw SpongeBob
        if (spongebobImg.complete && spongebobImg.naturalHeight > 0) {
            ctx.drawImage(spongebobImg, playerX, playerY, playerWidth, playerHeight);
        }
        
        // Draw rock - PERFECTLY ON GROUND (rock height 70, ground at 270 → 270-70=200)
        if (currentRock) {
            if (rockImg.complete && rockImg.naturalHeight > 0) {
                ctx.drawImage(rockImg, currentRock.x, 200, 70, 70);
            }
        }
        
        // Draw score
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Score: ' + score, 450, 30);
        
        requestAnimationFrame(drawGame);
    }
    // Jump on space
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameActive) {
            if (playerY >= 200) {
                velocity = -12;
            }
        }
    });
    
    function spawnRock() {
        if (!rockActive) {
            currentRock = { x: 600 };
            rockActive = true;
        }
    }
    
    function updateGame() {
        if (!gameActive) return;
        
        // Player physics
        velocity += gravity;
        playerY += velocity;
        
        // Ground collision
        if (playerY > 200) {
            playerY = 200;
            velocity = 0;
        }
        // Ceiling
        if (playerY < 50) {
            playerY = 50;
            velocity = 0;
        }
        
        // Rock spawn timer - spawn new rock after previous one leaves
        if (!rockActive) {
            rockSpawnTimer++;
            if (rockSpawnTimer > 40) { // Delay between rocks
                spawnRock();
                rockSpawnTimer = 0;
            }
        }
        
        // Move rock if exists
        if (currentRock) {
            currentRock.x -= 5; // SLOWER speed
            
            // COLLISION DETECTION
            if (currentRock.x < playerX + playerWidth - 15 && 
                currentRock.x + 50 > playerX + 15 && 
                playerY + playerHeight > 200) {
                gameActive = false;
                alert('🎮 Game Over! Score: ' + score);
                
                if (confirm('Play again?')) {
                    location.reload();
                }
            }
            
            // Remove rock when off screen
            if (currentRock.x < -80) {
                currentRock = null;
                rockActive = false;
                score += 10;
                document.getElementById('runnerScore').textContent = score;
            }
        }
        
        setTimeout(updateGame, 30);
    }
}

