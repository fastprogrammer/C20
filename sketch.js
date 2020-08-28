var PLAY = 0;
var END = 1;
var gameState = PLAY;

var player, player_running;
var banana, bananaImage, obstaclesImage;
var score, back, backgroundImage, ground;

var obstaclesGroup, fruitsGroup;

var score = 0;

function preload(){
  backgroundImage = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("stone.png");
  
  obstaclesImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200,200,10,10);
  back.addImage("bg",backgroundImage);
  back.x = back.width/2;
  
  player = createSprite(50,350,10,10);
  player.addAnimation("run",player_running);
  player.scale = 0.15;
  
  ground = createSprite(48,364,100,1);
  
  obstaclesGroup = createGroup();
  fruitsGroup = createGroup();
}

function draw() {
  background(220);
  
  if(back.x < 100){
    back.x = back.width/2; 
  }
  
  ground.visible = false;
  
  if(gameState === PLAY){
    back.velocityX = -10;
    
    player.visible = true;
    back.visible = true;
    
    if(keyDown("space") && player.y >= 317.45){
      player.velocityY = -15; 
    }
    
    player.velocityY = player.velocityY+0.8;
    
    if(obstaclesGroup.isTouching(player) && player.scale === 0.1){
      score = score-2;
      gameState = END; 
    }
    if(obstaclesGroup.isTouching(player) && player.scale === 0.15){
      obstaclesGroup.destroyEach();
      fruitsGroup.destroyEach();
      score = score-2;
      player.scale = 0.1;
    }
    if(fruitsGroup.isTouching(player)){
      score = score + 2;
      fruitsGroup.destroyEach();
    }
  }
  if(gameState === END){
    back.velocityX = 0;
    back.visible = false;
    obstaclesGroup.destroyEach();
    fruitsGroup.destroyEach();
    player.visible = false;
    fill("red");
    text("Game-Over",175,200);
    fill("black");
    text("Press R to restart",165,225);
    
    if(keyDown("r")){
      gameState = PLAY;
      score = 0;
      player.scale = 0.15;
    }
  }
  
  drawSprites();
  
  fill("white");
  text("Score: "+score,345,50);
  
  player.collide(ground);

  spawnFruits();
  spawnObstacles();
  
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacles = createSprite(400,350,10,10);
    obstacles.addImage("stone",obstaclesImage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -10;
    obstacles.lifetime = 40;
    obstaclesGroup.add(obstacles);
  }
}

function spawnFruits(){
  if(frameCount % 100 === 0){
    var fruits = createSprite(400,250,10,10);
    fruits.addImage("fruit",bananaImage);
    fruits.scale = 0.05;
    fruits.velocityX = -10;
    fruits.lifetime = 40;
    fruitsGroup.add(fruits);
  }
}