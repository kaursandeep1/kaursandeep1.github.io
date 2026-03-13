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

    // Load Phaser when game modal opens
function loadEndlessRunner(container) {
    container.innerHTML = `
        <div style="text-align: center; color: var(--text-primary); width: 100%;">
            <div id="gameCanvas" style="width: 100%; height: 350px;"></div>
            <p style="margin-top: 1rem; color: #f59e0b;">⬆️ Click/Tap to jump! Avoid rocks.</p>
        </div>
    `;
    
    // Load Phaser if not already loaded
    if (typeof Phaser === 'undefined') {
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/phaser@3.18.1/dist/phaser.min.js';
        script.onload = function() {
            setTimeout(() => {
                if (typeof initGame === 'function') {
                    initGame();
                }
            }, 100);
        };
        document.head.appendChild(script);
    } else {
        setTimeout(() => {
            if (typeof initGame === 'function') {
                initGame();
            }
        }, 100);
    }
}
    
    draw();
    update();

}
