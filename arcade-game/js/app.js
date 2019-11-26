let gameScore = 0;
let	lives = 5;
let level = 1;
let	livesLeft = document.querySelector('.lives > span');
let	score = document.querySelector('.score > span');
let seconds = 0;
let minutes =0;
let timeClock = document.querySelector('.clock > span');
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = this.getRandomRow();
    this.x = -50;
    this.speed = Math.random() * (5)+1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//player
var Player = function(){
    //speed and position
    this.speed = 5;
    this.x = 200;
    this.y = 400; 
    //sprite for the player
    
    this.sprite = 'images/char-boy.png';
};

//gets a random row for the enemies
Enemy.prototype.getRandomRow = function(){
    var id = Math.round(Math.random() * (2)+1);
    switch(id) {
        case 1:
          return  55;
        case 2:
          return  140;
        case 3:
         return  225;
    }
};

//for timer
function timer() {
  setInterval(
      function(){ 
          seconds++;
          if(seconds==60){
              minutes++;
              seconds=0;
          }
      }, 1000);
    document.getElementsByClassName("clock").innerHTML = minutes + ":" + seconds;
}

//gets positions as rectangles then checks if they overlap at all
//credit for 
Enemy.prototype.checkCollision = function(){
        var rect1 = {x: this.x, y: this.y, width: 50, height: 50};
        var rect2 = {x: player.x, y: player.y, width: 50, height: 50};
        //checks boundries of the rectangles to see if they are over lapping
        //example taken from:
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.height + rect1.y > rect2.y) {
            // collision detected!
                lives = lives -1;
                livesLeft.innerText = lives;
                player.x = 200;
                player.y = 400;
        }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.checkCollision();
    //if out of lives after collision detections
    if(lives<1){
       alert("You are out of lives!\nGAME OVER\n"
              + "Final Score:" + gameScore * 100);
        player.x = 200;
        player.y = 400;
        gameScore = 0;
        lives = 5;
        livesLeft.innerText = lives;
        score.innerText = '';
        level = 1;
        document.getElementsByClassName("clock").innerHTML = "";
//        score.innerText = gameScore * 100;
//            livesLeft.innerText = lives;
       }
    if(this.x < 525) {
        this.x = this.x + this.speed;
    }else{
        //resets the enemy position and speed
        this.x = -50;
        this.y = this.getRandomRow();
        this.speed = (Math.random() * (5)+1) * level;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and

Player.prototype.update = function(dt){
    this.speed = this.speed * dt;
    if(this.y < 60){
        
            this.x = 200;
            this.y = 400;
            gameScore++;
			score.innerText = gameScore * 100;
            livesLeft.innerText = lives;
            
            
        if(gameScore==5){
           level = level +1;
            document.body.style.backgroundColor = "goldenrod";
            alert("Level 2");
           }
        if(gameScore==10){
           level = level +1;
            document.body.style.backgroundColor = "green";
            alert("Level 3");
           }
        if(gameScore==15){
           level = level +1;
            document.body.style.backgroundColor = "blue";
            alert("Level 3");
           }
    }
};

Player.prototype.reset = function(){
    //reset the player position
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.

Player.prototype.handleInput = function(playerInputKeys){
  switch (playerInputKeys) {
    case 'left': // Left
        if(this.x > 0){
            this.x = this.x - 100;  
        }
    break;
    case 'up': // Up
        if(this.y > 50){
            this.y = this.y - 85; 
        }
    break;
    case 'right': // Right
        if(this.x < 400){
           this.x = this.x + 100; 
       }
    break;
    case 'down': // Down
        if(this.y < 400){
            this.y = this.y + 85; 
        }
    break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var playerInputKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(playerInputKeys[e.keyCode]);
});

