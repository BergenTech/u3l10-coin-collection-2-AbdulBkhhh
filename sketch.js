// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let speed = 3
let hits = 0

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = random(width);
  obstacleY = 0;
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 40);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 15);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    playerY -=5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY +=5;
  }
  
  // TODO: Add up/down movement
  // HINT: Use UP_ARROW and DOWN_ARROW keys
  // Movement should be 5 pixels per frame
  
  // TODO: Add boundary checking
  // HINT: Keep player within canvas bounds
  // Check against 0, width, and height
}

function moveObstacle() {
  obstacleY+=speed
  if(obstacleY>=height){
    obstacleX = random(width)
    obstacleY=0
    speed+=0.5
  }
  // TODO: Move obstacle from left to right
  // HINT: Increase obstacleX by obstacleSpeed
  
  // TODO: Reset obstacle when it goes off screen
  // HINT: Check if obstacleX > width
  // Reset to left side and new random Y position
}

function checkCoinCollection() {
  if(dist(playerX,playerY,coinX,coinY)<15){
    score++
    initializeGame()
    speed+=0.5
  }
  // TODO: Check if player touches coin
  // HINT: Use dist(playerX, playerY, coinX, coinY)
  // If distance < 15:
  //   - Increase score
  //   - Create new coin
  //   - Increase obstacle speed slightly
}

function checkCollisions() {
  if(dist(playerX,playerY,obstacleX,obstacleY)<20){
    hits++
    initializeGame()
  }
  if(hits>=3){
    gameOver = true;
  }
  // TODO: Check if player hits obstacle
  // HINT: Similar to coin collection
  // If hit (distance < 20):
  //   - Increase hits
  //   - Check for game over (hits >= 3)
  //   - Reset positions
}

function displayStats() {
  fill(0);
  textSize(16);
  text("Score: " + score, 30, 20);
  text("Hits:" + hits, 95, 20)
  text("Speed:"+ speed, 160,20)
  // TODO: Add display for hits and speed
}

function displayGameOver() {
  background(220)
  fill(0)
  textAlign(CENTER, CENTER)
  textSize(40)
  text("Game Over", 200,200)
  fill(0)
  textSize(15)
  text("Final Score:"+score,200,225)
  fill(0)
  textSize(25)
  text("Press R to Restart",200,250)
  // TODO: Show game over screen
  // HINT: Use textAlign(CENTER, CENTER)
  // Show:
  //   - "Game Over" message
  //   - Final score
  //   - "Press R to Restart"
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  score = 0
  hits = 0
  speed = 3
  gameOver = false;
  initializeGame()
  // TODO: Reset all game variables
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()
}

function keyPressed() {
  if(key === 'r' || key === 'R'){
    resetGame()
  } 
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}