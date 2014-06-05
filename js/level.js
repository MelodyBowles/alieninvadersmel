//modified from
//https://github.com/cykod/AlienInvaders

//level.js stores data
//-levels
//-sprites
//-screens
//-audio




//key/value pairs
//this is a core construct of javascript
//levelData, spriteData and GameAudio all function using this construct

//sprite data key/array
//level data key/array
//audio key/audio file
//game initialise key/function


 
//design the levels here
//0= empty
//1= grey cloud
//2= white cloud
var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,1,0,1,0,1,0,1,0,1,0],
          [0,1,0,1,0,1,0,1,0,1,0],
          [0,1,0,1,0,1,0,1,0,1,0],
          [0,1,0,1,0,1,0,1,0,1,0],
          [0,1,0,1,0,1,0,1,0,1,0],
          [0,1,0,1,0,1,0,1,0,1,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,0,2,0,2,0,2,0,0],
          [0,0,2,0,2,0,2,0,2,0,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     3:   [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0]]
              
               };

//pairs of names and values for sprite locations on the sprite sheet image
//this is a useful resource http://getspritexy.com/
//sx = x location
//sy = y location
//w  = width
//h  = height
//cls = class?
//frames = for animation

  var spriteData = {
    'alien1': { sx: 0,  sy: 2,  w: 61, h: 40, cls: Alien, frames: 2 },
    'alien2': { sx: 1,  sy: 49, w: 64, h: 40, cls: Alien, frames: 2 },
    'player': { sx: 6,  sy: 91, w: 90, h: 100, cls: Player },
    'missile1': { sx: 0,  sy: 195, w: 25,  h: 38, cls: Missile },
    'missile2': {sx: 27, sy: 189, w: 19,  h:28,   cls:Missile2 }
  }


//this function loads the start screen with title and text
//loads new gameboard object and 'screen'
//game loop?
  function startGame() {
    var screen = new GameScreen("CloudBurst", "Help the dragon clear away the clouds for a sunny day!", "(press space to begin)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

//this function loads the game over screen with title and text
//loads new gameboard object and 'screen'

  function endGame() {
    var screen = new GameScreen("Game Over", "It kept on raining for forty days and forty nights...", "(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

//this function loads the you win screen
//loads new gameboard object and 'screen'
  function winGame() {
    var screen = new GameScreen("You Win!", "It was the hottest day in twenty years. Everyone prayed for rain.", "(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

//ths function first loads the audio from the specified files and assigns it to the functions 'fire' and 'die'
//'fire' and 'die' functions apply to both the player and the enemy
//possibly add sounds for other functions?

//the Game.initialise function calls assigns the levelData and spriteData to the #gameboard. use of the '#' indicates CSS styling
//'gameboard' is used in index.html
//initialise key/value pairs "start", "die" and "win" with the functions listed on this page
//in this instance "die" is applicable only to the player

  $(function() {
    GameAudio.load({ 'fire' : 'media/puff.ogg', 'die' : 'media/silence.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



