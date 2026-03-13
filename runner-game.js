// ENDLESS RUNNER GAME - Original version for portfolio
let config, game, scene;
let player, ground, obstacles, score = 0;
let gameActive = false;
let scoreText, gameOverText;

function initGame() {
    const gameContainer = document.getElementById('gameCanvas');
    if (!gameContainer) return;
    
    gameContainer.innerHTML = '';
    
    config = {
        type: Phaser.AUTO,
        width: 700,
        height: 350,
        parent: 'gameCanvas',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 800 },
                debug: false
            }
        },
        scene: {
            preload: preloadAssets,
            create: createScene,
            update: updateGame
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };
    
    game = new Phaser.Game(config);
}

function preloadAssets() {
    this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAJtJREFUOE9jZKAQMFKqgRkZGfPj4uK2oKthZGT8z8jIeA5dgJmZ+T8jI+MMdA1MTEz/mZmZv6CLMTMz/2NhYbmNLsbKyvqfm5v7GroYOzv7fz4+vivoYvz8/P8FBAQuo4sJCgr+FxYWvoguxsfH919UVHQeXUxUVPSfuLj4WXQxMTGxf5KSkqfRxSQlJf9JS0sfRxeTlZX9p6Cg8B9dTFtbG10MANUFJwZeC7kTAAAAAElFTkSuQmCC');
    this.load.image('obstacle', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxxn8AAAAAXNSR0IArs4c6QAAAFdJREFUGFd9z7ENgDAMBMCLiI4pM2SMggUo0rAHBfsvQVES+bqT7QN4xRgHwC0i2s0pGWeMzUoYY07Fj/eLNFVt+hRFMY/2W7quO2ME5zzsHYSQ/ltAVXXnvA9UaQ6PBPjI3wAAAABJRU5ErkJggg==');
    this.load.image('ground', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=');
}

function createScene() {
    // Ground
    ground = this.physics.add.staticGroup();
    ground.create(400, 330, 'ground').setScale(800, 20).refreshBody();
    
    // Player
    player = this.physics.add.sprite(100, 300, 'player').setScale(2);
    player.setCollideWorldBounds(true);
    player.setGravityY(800);
    
    // Obstacles group
    obstacles = this.physics.add.group();
    
    // Score text
    scoreText = this.add.text(20, 20, 'Score: 0', { 
        fontSize: '20px', 
        fill: '#f59e0b',
        fontFamily: 'Arial',
        fontWeight: 'bold'
    });
    
    // Game over text
    gameOverText = this.add.text(300, 150, 'GAME OVER', { 
        fontSize: '32px', 
        fill: '#ff0000',
        fontFamily: 'Arial',
        fontWeight: 'bold'
    });
    gameOverText.setVisible(false);
    
    // Collisions
    this.physics.add.collider(player, ground);
    this.physics.add.collider(obstacles, ground);
    this.physics.add.overlap(player, obstacles, gameOver, null, this);
    
    // Input
    this.input.on('pointerdown', jump);
    
    // Spawn obstacles
    this.time.addEvent({
        delay: 2000,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true
    });
    
    gameActive = true;
}

function updateGame() {
    if (!gameActive) return;
    
    // Move obstacles left
    obstacles.children.iterate((obs) => {
        if (obs) {
            obs.x -= 5;
            if (obs.x < 0) {
                obs.destroy();
                score += 10;
                scoreText.setText('Score: ' + score);
            }
        }
    });
}

function jump() {
    if (!gameActive) return;
    if (player.body.touching.down) {
        player.setVelocityY(-350);
    }
}

function spawnObstacle() {
    if (!gameActive) return;
    let obstacle = obstacles.create(750, 300, 'obstacle').setScale(1.5);
    obstacle.setGravityY(800);
}

function gameOver() {
    gameActive = false;
    player.setTint(0xff0000);
    gameOverText.setVisible(true);
    
    // Add restart button
    let restartBtn = this.add.text(300, 200, 'RESTART', { 
        fontSize: '24px', 
        fill: '#f59e0b',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        backgroundColor: '#111827',
        padding: { x: 20, y: 10 }
    });
    restartBtn.setInteractive();
    restartBtn.on('pointerdown', () => {
        this.scene.restart();
    });
}
