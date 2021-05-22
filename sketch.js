var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  bell=loadSound("sound/bell.mp3")
  Pinkani=loadAnimation("opponent1.png","opponent2.png")
  pinkani2=loadAnimation("opponent3.png")
   yelani=loadAnimation("opponent4.png","opponent5.png")
    yelani2=loadAnimation("opponent6.png")
   redani=loadAnimation("opponent7.png","opponent8.png")
    redani2=loadAnimation("opponent9.png")
  gameImg=loadImage("gameOver.png")
}

function setup(){
  
createCanvas(1200,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = 0;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("s1",mainRacerImg1);
mainCyclist.scale=0.07;
  game=createSprite(650,150)
  game.addImage(gameImg)
  game.scale=0.8
  game.visible=false
  
  pinkG= new Group()
  
  redqG= new Group()
  yellowG= new Group()
}

function draw() {
  background(0);
    mainCyclist.x=camera.position.x-270;
  drawSprites();
 
   textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  distance=distance+Math.round(getFrameRate()/50);
    // path.velocityX=-(6+2*distance/150)
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    if(keyDown("space")){
      bell.play();
    }
    if(keyDown(RIGHT_ARROW)){
      path.velocityX=-6
    } 
    else{
      path.velocityX=0
    }
      var selectPlayer=Math.round(random(1,3))
      if(frameCount % 150===0){
        
      
      if(selectPlayer===1){
        pink1();
      }
    if(selectPlayer===2){
        yellow1();
      }
    if(selectPlayer===3){
        red1();
      }  
      }
    if(pinkG.isTouching(mainCyclist)){
      gameState=END
      pink.velocityY=0;
      
      pink.addAnimation("p1",pinkani2)
    }
     if(yellowG.isTouching(mainCyclist)){
      gameState=END
      yellow.velocityY=0;
      yellow.addAnimation("y1",yelani2)
    }
     if(redqG.isTouching(mainCyclist)){
      gameState=END
      redq.velocityY=0;
      redq.addAnimation("r1",redani2)
    }
    
    }
  else if(gameState===END){
    path.velocityX=0;
     textSize(20);
  fill(255);
  text("press up arrow to restart",500,200);
  mainCyclist.velocityY=0;
    game.visible=true;
    mainCyclist.addAnimation("s1",mainRacerImg2);
    pinkG.setVelocityXEach(0);
    pinkG.setLifetimeEach(-1)
    yellowG.setVelocityXEach(0);
    yellowG.setLifetimeEach(-1)
    redqG.setVelocityXEach(0);
    redqG.setLifetimeEach(-1)
    if(keyDown("up")){
      reset()
    }
  }
    
 }

function pink1(){
  pink=createSprite(1100,Math.round(random(50,250)))
  pink.addAnimation("p1",Pinkani)
  pink.velocityX=-(6+2*distance/150)
  pink.scale=0.06;
  pink.lifetime=170
  pinkG. add(pink)
}


function yellow1(){
    yellow=createSprite(1100,Math.round(random(50,250)))
  yellow.addAnimation("y1",yelani)
  yellow.velocityX=-(6+2*distance/150)
  yellow.scale=0.06;
  yellow.lifetime=170
  yellowG. add(yellow)
}


function red1(){
    redq=createSprite(1100,Math.round(random(50,250)))
  redq.addAnimation("r1",redani)
  redq.velocityX=-(6+2*distance/150)
  redq.scale=0.06;
  redq.lifetime=170
  redqG. add(redq)
}
function reset(){
  gameState=PLAY;
  game.visible=false
mainCyclist.addAnimation("s1",mainRacerImg1);
  pinkG.destroyEach();
  yellowG.destroyEach();
  redqG.destroyEach();
  distance=0
}