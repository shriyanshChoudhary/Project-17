var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,invis,ground2;
var banana ,bananaImage,ground,obstacle,obstaclesGroup;
var FoodGroup, obstacleGroup;
var score,foodScore;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  stopped = loadAnimation("sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroun = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400);
  
  ground = createSprite(100,360,800,20);
  ground.velocityX = -4;
  
  monkey = createSprite(80,320,10,10);
  monkey.addAnimation("runner",monkey_running);
  monkey.addAnimation("stop",stopped);
  monkey.scale=0.1;
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  score = 0;
  foodScore = 0;
}


function draw() {
background("white");
  
if(gameState == PLAY) {
  
  if(keyDown("space") && monkey.y > 318) {
    monkey.velocityY = -17;
    
  }
  
  spawnObstacles();
  spawnfruits();
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    foodScore = foodScore + 1;
  }
  
  if(ground.x<1){
    ground.x=ground.width/2;
  }
  
  score = score+Math.round(frameRate()/60);
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
  
}

  if(gameState == END) {
    monkey.changeAnimation("stop",stopped);
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.destroyEach();
    ground.velocityX = 0;
    textSize(26);
    text("GAMEOVER",120,180);
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  drawSprites();
  
  textSize(15);
  text("Food : "+foodScore,320,30);
  textSize(17);
  stroke("black");
  text("Survival Time : "+ score,140,30);
}

function spawnfruits(){
 if(frameCount % 80 == 0 ){
   banana = createSprite(415,130,10,10);
   banana.addImage(bananaImage); 
   banana.scale = 0.1;
   banana.y = Math.round(random(120,200));
   
   banana.velocityX = -6;
   banana.lifetime = -1;
   
   foodGroup.add(banana);
 }
  
}

function spawnObstacles() {
    if(frameCount % 300 == 0){
    obstacle=createSprite(440,315,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle",-30,0,480,400);
    
    obstacle.velocityX = -6;
    obstacle.lifetime = -1;
    
    obstaclesGroup.add(obstacle);
  }
}


