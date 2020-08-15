var monkey, monkeyAnimated, stillMonkey;
var bananaImg;
var BananaGroup;
var rockImg;
var RockGroup;
var invisibleGround;
var backGround, jungle;
var score;
var restart, restartImg;
var RestartGroup;
var gameState;
var PLAY, END, RESTART;

function preload() {
  monkeyAnimated = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("rock.png");
  restartImg = loadImage("restart.png");
  jungle = loadImage("jungle2.png");
  
  
  
}


function setup() {
  createCanvas(600, 200);

  //creates background sprite
  backGround = createSprite(300,100,600,200);
  backGround.addImage("jungle",jungle);
  
  //creates game state
  PLAY = 1;
  END = 0;
  RESTART = 2;
  gameState = PLAY;

  //creates monkey
  monkey = createSprite(50, 150, 20, 50);
  monkey.addAnimation("monkey", monkeyAnimated);
  monkey.scale = 0.05;
  
  backGround.velocityX = -6;
  backGround.x = backGround.width / 2;
  
  //invisible Ground to support Trex
  invisibleGround = createSprite(300, 197, 600, 5);
  invisibleGround.visible = false;

  //creates groups
  BananaGroup = new Group();
  RockGroup = new Group();

  //reset button
  RestartGroup = new Group();

  //score
  score = 0;

  textSize(18);
  textFont("Comic Sans");



}

function draw() {
  background(220);
  
  //console.log(monkey.x);
  
  if (gameState === PLAY) {
    
    backGround.velocityX = -6;
    
    if (backGround.x < 0){
      backGround.x = backGround.width/2;
    }
    
    monkey.velocityY+=0.8;
    
    if (keyDown("space") && monkey.y >= 163) {
      monkey.velocityY = -15;
    }
    
    
    if (BananaGroup.isTouching(monkey)) {
      //playSound("sound://category_achievements/vibrant_game_postive_achievement_4.mp3",false);
      score += 2;
      BananaGroup.destroyEach();
    }
    
    if (RockGroup.isTouching(monkey)) {
      //playSound("Jingle-(Death)---Donkey-Kong-Country-Tropical-Freeze---Music.mp3",false);
      gameState = END;
    }
    
    switch(score) {
      case 10: monkey.scale = 0.06;
      break;
      case 20: monkey.scale = 0.07;
      break;
      case 30: monkey.scale = 0.08;
      break;
      case 40: monkey.scale = 0.09;
      break;
      case 50: monkey.scale = 0.1;
      break;
      default:
      break;
    }
    
    spawnRocks();
    spawnBananas();
    
  }
  
  else if (gameState === END) {
    backGround.velocityX = 0;
    monkey.velocityY = 0;
    RockGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    RockGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    restart = createSprite(300,100,50,50);
    restart.addAnimation("restart", restartImg);
    restart.scale = 0.2;
    RestartGroup.add(restart);
  }
  
  if (mousePressedOver(restart) && gameState === END) {
    RestartGroup.destroyEach();
    score = 0;
    gameState = RESTART;
  }
  
  else if (gameState === RESTART) {
    monkey.scale = 0.05;
    BananaGroup.destroyEach();
    RockGroup.destroyEach();
    gameState = PLAY;
    score = 0;
  }
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  RockGroup.setColliderEach("circle",0,0,180);

  
  
  drawSprites();
  text("Banana Score: "+ score, 450, 50);
}

function spawnRocks() {
  if (frameCount % 150 ===0) {
    var rock = createSprite(600,160,40,40);
    //rock.debug = true;
    rock.velocityX = -6;
    rock.addAnimation("rock", rockImg);
    rock.scale = 0.2;
    rock.lifetime = 100;
    RockGroup.add(rock);
  }
}

function spawnBananas() {
  if (frameCount % 100 ===0) {
    var banana = createSprite(600, 110, 20, 20);
    banana.y = random(15,50);
    banana.addAnimation("Banana", bananaImg);
    banana.velocityX = -6;
    banana.scale = 0.05;
    banana.lifetime = 100;
    BananaGroup.add(banana);
  }
}
