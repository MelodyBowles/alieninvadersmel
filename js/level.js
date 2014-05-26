//modified from
//https://github.com/cykod/AlienInvaders

 
//this be where teh aliens appear in level- 0=no alien, 1=whalien 2=ralien
//can add levels with aliens in different places
//can add more numbers to array for more aliens
var levelData = { 
     1:  [[0,2,0,0,1,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,2,0,0],
          [0,0,0,2,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,2,0,0,0],
          [0,0,1,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,0,1,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,2,0,0,0,0,0,0,1,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0]] };

//pairs of names and values for spriteys locations on the sprite sheet
//this is a useful resource http://getspritexy.com/
  var spriteData = {
    'alien1': { sx: 3,  sy: 3,  w: 55, h: 43, cls: Alien, frames: 2 },
    'alien2': { sx: 5,  sy: 48, w: 57, h: 43, cls: Alien, frames: 2 },
    'player': { sx: 2,  sy: 93, w: 55, h: 70, cls: Player },
    'missile': { sx: 4,  sy: 167, w: 15,  h: 30, cls: Missile }
  }
//this be the start screen
  function startGame() {
    var screen = new GameScreen("Alien Invaders","press space to start",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

//this be the game over screen...

  function endGame() {
    var screen = new GameScreen("Game Over","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

//this be the win screen!
  function winGame() {
    var screen = new GameScreen("You Win!","(press space to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

//change teh audio here remember to use .ogg file. audacity is youur friend
//possibly add sounds for other functions?

  $(function() {
    GameAudio.load({ 'fire' : 'media/clink.ogg', 'die' : 'media/snap.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



