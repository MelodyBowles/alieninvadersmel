//modified from
//https://github.com/cykod/AlienInvaders

//game.js stores sprite behaviours- player, missile, alien and alienflock

//callbacks- allows the code to jump to where it needs to go instead of waiting for it to execute in a linear fashion
//vague understanding is vague


//this is the enemy grouping
//this.invulnrable? 
//this.dx
//this.dy

var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
//this hit? to do with removing sprites after they're hit?
  this.hit = 1; this.lastHit = 0;
//speed changes how fast the aliens are moving and their rate of fire
  this.speed = 5;

//assume this draws the flock
  this.draw = function() {};

//if there is a next level load it. if there isn't a next level the player wins
//'win' calls the winGame function from level.js
  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  //this is to do with the flock movement speed

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    //max as in max value?
    //??? presumably to do with the flock somehow
    //cnt ++ adding one to the cnt? what is cnt?
    //iterate appears in engine.js
    //i have no idea what this does but it involves numbers
    //maybe max is referred to elsewhere 

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}

var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

//this function draws the aliens/clouds

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

//this is the die function

Alien.prototype.die = function() {
  GameAudio.play('die');
//this increases flock speed as enemies are killed
  this.flock.speed += 0.5;
  this.board.remove(this);
}


Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
//changes no. of frames for sprites displayed allowing animation
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}

//this controls enemy shooting
Alien.prototype.fireSometimes = function() {
    //change numbers for more or less fire
      if(Math.random()*100 < 5) {
        //this calculates where to draw the missile
        this.board.addSprite('missile1',this.x + this.w/2 - Sprites.map.missile1.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}

//this is the player bit

var Player = function Player(optss) { 
  this.reloading = 20;
}

//this function draws the player

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}

//this function calls the audio and screen data from level.js using the 'die' key

Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}

//movement stuffs
Player.prototype.step = function(dt) {
  //it's pretty easy to add more keys in here
  //key values are assigned at the top of engine.js
  //if(Game.keys['up']) { this.y -= 100 * dt; }
  //if(Game.keys['down']) { this.y += 100 * dt; }
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }

  //this bit means you can't fall of the screen
  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;

    //change the no. after board.missiles for more missiles
    //this stops you continuously firing your way to victory
    //'fire' is the key for the audio from level.js
    //'missile' is also a key to something
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 3) {
    GameAudio.play('fire');
    //this draws the missile in the right place
    //change the number for this.reloading to speed up reload times
    this.board.addSprite('missile2',
                          this.x + this.w/2 - Sprites.map.missile2.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 10;
  }
  return true;
}

//missile things happen here
var Missile = function Missile(opts) {
   this.dy = opts.dy;
}

//this function draws the missile

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile1',this.x,this.y);
}

//this function controls the missile movement
//also controls collision with edge of gameboard?

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

//this function removes missiles from the board?


Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

//trying to draw another missile
var Missile2 = function Missile2(optss) {
   this.dy = optss.dy;
   this.player = optss.player;
}

//this function draws the missile

//added another class of missile to the level.js spritesheet and called it here so player and enemies fire different sprites!

Missile2.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile2',this.x,this.y);
}

Missile2.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

//this function removes missiles from the board?


Missile2.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}