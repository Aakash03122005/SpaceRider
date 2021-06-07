// Project Space Rider
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var maxAstroids=50;//the maxium Astroids drops.
var astroids=[];

var engine, world;
var rand;

var score=0

var gunShotsound
var missileSound

var explosionSound

var boom,boomImg


var playButton,playButtonImage
var wellcome,wellcomeImg,title,titleImg

var box,boxImg;// the space is the box
var obastacle1,obastacle1Img;
var bullet,bulletImg;

var nice,niceImg;

var win,winImg;

var gameState="start";

var gameState="Play";

var enemybullet1Img;


function preload()
{
    // loading image on the sprites.
    enemybullet1Img = loadImage("images/enemybullet.png");
    obastacle1Img = loadImage("images/enemy.png");

    // UI Elements
    boomImg = loadImage("images/Boom2.png");
    niceImg = loadImage("images/nice.png");
    winImg = loadImage("images/win.png");
    titleImg = loadImage("images/title.png");
    wellcomeImg = loadImage("images/wellcome.png");

    // spaceShip sprite and bullet sprite
    boxImg = loadImage("images/rocket.png");
    bulletImg = loadImage("images/bullet2.png");

    // sound effects
    gunShotsound = loadSound("sound/gunshot.mp3");
    missileSound = loadSound("sound/boom3.mp3");
    explosionSound = loadSound("sound/Explosion.mp3");

    // Reset button
    playButtonImage=loadImage("images/play.png");
}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(600,600);

    // UI Editing
    nice=createSprite(300,300,200,200);
   
    win=createSprite(260,180,100,100)

    wellcome=createSprite(280,140,100,100)
    wellcome.addImage(wellcomeImg)
    wellcome.scale = 0.4;

    title=createSprite(320,340,100,100)
    title.addImage(titleImg)
    title.scale = 1;

    playButton=createSprite(320,420,50,50)
    playButton.addImage(playButtonImage)
    playButton.scale = 1.3;
    playButton.visible=true;

    box = createSprite(300,550,35,35);
    box.debug = false;
    // to see the collider

    boom = createSprite(200,200,50,50);
   

    obastacle1Group = new Group();
    bullet1Group = new Group();
    bulletGroup = new Group();

    //create drops
    if(frameCount % 400 === 0)
    {
        for(var i=0; i<maxAstroids; i++)
        {
            astroids.push(new Astroids(random(100,500), random(100,500)));
        }
    }
    Engine.run(engine);
}

function draw(){
    Engine.update(engine);
    
    background("black"); 

    reset = new Reset()
    reset.display();

    if(score=== 0)
    {
        if(mousePressedOver(playButton))
        {
            playButton.visible=false;
            title.visible=false;
            wellcome.visible=false;  
        }
        gameState = "Play"
    }  
    
    if(gameState==="Play")
    {
        

        fill("white");
        textSize(25);
        text("Score:"+score,30,50);

        boom.visible=false;
        boom.scale = 0.5;

      

        win.addImage(winImg);
        win.scale=1;
        win.visible=false;

        nice.visible=false;
        nice.addImage(niceImg);
        nice.scale = 1.5;
        
        box.addImage(boxImg);
        box.scale = 0.3;
    
        // movement of the sprite
        if(keyDown("left_arrow"))
        {
            box.x = box.x - 6;
        }
        if(keyDown("right_arrow"))
        {
            box.x = box.x + 6;
        }

        if(keyCode == 32)
        {
            box.y = box.y - 15;
        }

        if(keyWentDown("UP_arrow"))
        {
        //  So we have to add firing system
        spawnbullet();
        }

        //display rain drops,for loop function
        for(var i = 0; i<maxAstroids; i++)
        {
            astroids[i]. DisplayAstroids();
            astroids[i].update()
        }

        if(bulletGroup.isTouching(obastacle1Group))
        {
        obastacle1Group.destroyEach();
        gunShotsound.play();
        score=score+1;
        boom.addImage(boomImg);
        boom.visible=true;
        }

        if(bulletGroup.isTouching(bullet1Group))
        {
            bullet1Group.destroyEach();
            bulletGroup.destroyEach();
            missileSound.play();
        }

        if(obastacle1Group.isTouching(box) || bullet1Group.isTouching(box) )
        {
            box.destroy();
            obastacle1Group.destroyEach();
            explosionSound.play();
            gameState="Over"
        }

        if(score===5)
        {
         nice.visible=true;
        }

        if(score===10)
        {
            gameState="End"
            win.visible=true;
        }
        spawnObastacles();
        spawnenemyBullet();
    }
    
    if(gameState==="End")
    { 
    fill("white")
    textSize(25)
    text("You have Saved the Universe from the gready Aliens",20,250)
    text("Thank You!",220,300);
    obastacle1Group.destroyEach();
    boom.visible=false;
    box.velocityY = -15;
    box.lifetime = 30;
    }

    if(gameState==="Over")
    { 
    fill("white")
    textSize(25)
    text("Your Space Ship is destroyed ",180,250)
    text("You Lost!",250,300);
    obastacle1Group.destroyEach();
    boom.visible=false;
    bullet1.visible=false;
    }

    
    drawSprites();
}   

function spawnObastacles()
{
    if(frameCount % 100 === 0)
    {
        obastacle1 = createSprite(200,100,20,20);
        //fill("red");
        obastacle1.x = Math.round(random(120,500));
        obastacle1.addImage(obastacle1Img);
        boom.x = obastacle1.x;
        obastacle1.scale = 0.6;
        obastacle1.lifetime = 100;
        obastacle1Group.add(obastacle1);
       
       
    }
}

function spawnbullet()
{
    bullet = createSprite(300,450,20,20);
    bullet.velocityY = -15;
    bullet.addImage(bulletImg);
    bullet.x = box.x;
    bullet.scale = 0.05;
    bulletGroup.add(bullet);
    bullet.lifetime = 60;
    
}

function spawnenemyBullet()
{
    if(frameCount % 100 === 0)
    {
    var bullet1 = createSprite(50,50,20,20);
    bullet1.addImage(enemybullet1Img);
    bullet1.velocityY = 8;
    bullet1.lifetime = 60;
    bullet1.scale = 0.08;
    bullet1.x = obastacle1.x;
    bullet1.lifetime = 80;
    //bullet1.x = boom2.x ;
    //bullet1.y = boom2.y;
    bullet1Group.add(bullet1);
    bullet1.debug = false;
    // to see the collider
    }
    
}
