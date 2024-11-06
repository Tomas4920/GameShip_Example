const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables de la nave
const ship = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    speed: 5
};

// se dibuja la nave con esta funcion 
function drawShip() {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

// la funcion principal del juego 
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpiar la pantalla 
    drawShip(); // dib la nave
    requestAnimationFrame(gameLoop); // bucle
}

gameLoop();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración de la nave
const ship = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    speed: 5,
    bullets: []
};

// Teclado
let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Movimiento de la nave
function moveShip() {
    if (keys['ArrowLeft'] && ship.x > 0) {
        ship.x -= ship.speed;
    }
    if (keys['ArrowRight'] && ship.x < canvas.width - ship.width) {
        ship.x += ship.speed;
    }
    if (keys[' ']) {
        shootBullet();
    }
}

// Dibujar la nave
function drawShip() {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

// Dsiparo
function shootBullet() {
    ship.bullets.push({ x: ship.x + ship.width / 2, y: ship.y, speed: 7 });
}

// dibujar disparos 
function drawBullets() {
    ctx.fillStyle = '#ff0';
    ship.bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
        
        // eliminar las balas de la pantalla
        if (bullet.y < 0) {
            ship.bullets.splice(index, 1);
        }
    });
}

// bucle para el juego 
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveShip();
    drawShip();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

gameLoop();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración de la nave
const ship = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    speed: 5,
    bullets: []
};

// enemigos y puntuación
let enemies = [];
let score = 0;
let keys = {};

// teclado
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Mover nave
function moveShip() {
    if (keys['ArrowLeft'] && ship.x > 0) ship.x -= ship.speed;
    if (keys['ArrowRight'] && ship.x < canvas.width - ship.width) ship.x += ship.speed;
    if (keys[' ']) shootBullet();
}

// Dibujar nave
function drawShip() {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

// Disparar balas
function shootBullet() {
    ship.bullets.push({ x: ship.x + ship.width / 2, y: ship.y, speed: 7 });
}

// Dibujar y mover balas
function drawBullets() {
    ctx.fillStyle = '#ff0';
    ship.bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
        if (bullet.y < 0) ship.bullets.splice(index, 1);
    });
}

// para crear enemigos
function spawnEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        width: 20,
        height: 20,
        speed: 2
    });
}

// dib y mover los enemigos
function drawEnemies() {
    ctx.fillStyle = '#f00';
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // Eliminar enemigos fuera del lienzo
        if (enemy.y > canvas.height) enemies.splice(index, 1);
    });
}

// choques, colisiones, etc
function detectCollisions() {
    ship.bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 4 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 10 > enemy.y
            ) {
                // Eliminar enemigo y proyectil
                enemies.splice(enemyIndex, 1);
                ship.bullets.splice(bulletIndex, 1);
                score += 10;
            }
        });
    });
}

// puntuación
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Puntuación: ' + score, 10, 30);
}

// otro bucle del juego 
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveShip();
    drawShip();
    drawBullets();
    drawEnemies();
    detectCollisions();
    drawScore();
    
    // respawn de los enemigos de forma aleatoria
    if (Math.random() < 0.02) spawnEnemy();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
