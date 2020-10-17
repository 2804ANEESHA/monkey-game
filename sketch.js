
var monkey , monkey_running, monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var END = 0;
var gamestate;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  


}



function setup() {
  //creating the monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1;
  
  //creating the ground 
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2 ;
  console.log(ground.x) ;
  
  //generate random numbers
  var rand =  Math.round(random(120,200))
  console.log(rand)
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
  
}


function draw() {
  
  background(207,218,238);
  
  if(ground.x<0){
    ground.x = ground.width/2 ;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:  ",score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  if(gamestate != END)
    {
      survivalTime=Math.ceil(frameCount/frameRate())
    }
  text("Survival Time:"+ survivalTime, 100,50);
  
  
  
    if(obstacleGroup.isTouching(monkey)){
      gamestate = END;
      
    }
       
  if(gamestate==END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    
    
    
    
  }
  
  
  
  spawnBanana();
  spawnObstacle();
  
   drawSprites(); 
  
}
   
  function spawnBanana (){
  if(World.frameCount % 80==0){
   var banana = createSprite(600,120,40,10);
  banana.velocityX = -3;
   banana.y = Math.round (random(120,200)) ;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    banana.lifetime = 500;
    bananaGroup.add(banana);
  }
     }
    
    function spawnObstacle () {
  if(World.frameCount % 300==0){
  var obstacle = createSprite (600,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -1;
   obstacle.scale=0.1;
    obstacle.lifetime = 800 ;    
    obstacleGroup.add(obstacle);

      } 
  }
      





    