var player;
var ground;
var topObstaclesGroup, bottomObstaclesGroup;
var topObstacleImg, bottomObstacleImg;
var girlFighterImg;
var score;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){
  bottomObstacleImg = loadImage("flap_hum_imgs/Pointy_Up_Bar.png");
  topObstacleImg = loadImage("flap_hum_imgs/Pointy_Down_Bar.png");
  girlFighterImg = loadImage("flap_hum_imgs/Girl_Fighter.png");
}

function setup() {
  createCanvas(1200,600);
  player = createSprite(200,200,30,30);
  player.addImage(girlFighterImg);
  player.scale = 0.35;

  ground = createSprite(600,450,2400,20);
  ground.x = ground.width/2;
  ground.velocityX = -6;

  topObstaclesGroup = new Group();
  bottomObstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(255,255,255);  
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);

    if(keyDown(UP_ARROW)){
      player.velocityY = -10;
    }
    
    player.velocityY = player.velocityY + 0.5;
  
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnObstacles();

    if(player.isTouching(ground) || player.isTouching(bottomObstaclesGroup) || player.isTouching(topObstaclesGroup)){
      gameState = END;
    }
  } else if (gameState === END){
    ground.velocityX = 0;
    player.velocityY = 0;
    bottomObstaclesGroup.setVelocityXEach(0);
    topObstaclesGroup.setVelocityXEach(0);
    bottomObstaclesGroup.setLifetimeEach(-1);
    topObstaclesGroup.setLifetimeEach(-1);
  }

  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var rand1 = Math.round(random(50,150));
    var rand2 = Math.round(random(350,450));
    
    var topObstacle = createSprite(1200,rand1,45,100);
    topObstacle.addImage(topObstacleImg);
    topObstacle.scale = 0.25;

    var bottomObstacle = createSprite(1200,rand2,45,100);
    bottomObstacle.addImage(bottomObstacleImg);
    bottomObstacle.scale = 0.25;

    topObstacle.velocityX = -5;
    bottomObstacle.velocityX = -5;

    bottomObstacle.lifetime = 300;
    topObstacle.lifetime = 300;

    bottomObstaclesGroup.add(bottomObstacle);
    topObstaclesGroup.add(topObstacle);
  }
}