var bg, backgroundImg
var player1, player1Img
var coinsGroup, coinImg, coin
var obstaclesGroup, obstacleImg, obstacle
var enemy, enemyImg
var gameState = 'PLAY'
var score = 0
var reset, resetImg
var treasureImg, treasure

function preload(){
    backgroundImg = loadImage('assets/bg.jpg')
    playerImg = loadImage('assets/player.png')
    coinImg = loadImage('assets/coin-transformed.png')
    obstacleImg = loadImage('assets/obstacle-transformed.png')
    resetImg = loadImage('assets/reset.png')
    treasureImg = loadImage('assets/treasure.png')
}

function setup(){
    createCanvas(windowWidth, windowHeight)

    bg = createSprite(width/2.5, height/3, 400, 500)
    bg.addImage(backgroundImg)
    bg.x = bg.width
    bg.velocityX = -2
    bg.scale = 8.5

    player = createSprite(displayWidth/2 - 200, displayHeight/2)
    player.addImage(playerImg)
    player.scale = 0.25

    reset = createSprite(displayWidth/3, displayHeight/3)
    reset.addImage(resetImg)
    reset.visible = false
    reset.scale = 0.2

    coinsGroup = new Group()
    obstaclesGroup = new Group()
    treasureGroup = new Group()
    
}

function draw(){
    background(0)

    if(gameState === 'PLAY'){
        spawnCoins()
        spawnObstacles()
        if(keyDown(RIGHT_ARROW)){
            player.x = player.x + 5
        }
        else if(keyDown(LEFT_ARROW)){
            player.x = player.x - 5
        }
        else if(keyDown(DOWN_ARROW)){
            player.y = player.y + 5
        }
        else if(keyDown(UP_ARROW)){
            player.y = player.y - 5
        }
        // else if(keyDown('space')){
        //     player.velocityY = -5
        // }

        bg.velocityX = -2
        
        if (bg.x < 0){
            bg.x = bg.width/2;
          }
    
        if(coinsGroup.isTouching(player)){
            score = score + 5
            coinsGroup.destroyEach();
     
          }
        if(obstaclesGroup.isTouching(player)){
            gameState = 'END'
            gameOver()
       }
       spawnTreasure()
       if(player.isTouching(treasureGroup)){
        gameState = 'END'
        swal({
            title: `You won!`,
            text: "You got the treasure. Good Job!",
            imageSize: "100x100",
            confirmButtonText: "Remove alert"
        })
        

       }


    }
    else if (gameState = 'END'){
        coinsGroup.destroyEach();
        obstaclesGroup.destroyEach();
        bg.velocityX = 0;
        coinsGroup.setVelocityEach(0)
        obstaclesGroup.setVelocityEach(0)
        reset.visible = true

    }

    text('Score: ' + score, 100,200 )

    Reset()
    drawSprites()

}


function spawnCoins(){
    if(frameCount % 60 === 0){
        coin = createSprite(random(0, displayWidth),random(displayHeight/2, displayHeight/3))
        coin.addImage(coinImg)
        coin.scale = 0.2

        coin.velocityX = -3;
        coinsGroup.add(coin)
        coin.lifetime = 400
    }
}

function spawnObstacles(){
    if(frameCount % 80 === 0){
        obstacle = createSprite(random(displayWidth + 10, displayWidth + 50),player.y)
        obstacle.addImage(obstacleImg)
        obstacle.scale = 0.2

        obstacle.velocityX = -3;
        obstaclesGroup.add(obstacle)
        obstacle.lifetime = 400
    }
}

function gameOver(){
    swal({
        title: `Game Over`,
        text: "You could not get the treasure. Try Again!",
        imageUrl:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fflyclipart.com%2Fthumb2%2Ftreasure-chest-royalty-free-vector-clip-art-illustration-154639.png&imgrefurl=https%3A%2F%2Fflyclipart.com%2Ftreasure-chest-royalty-free-vector-clip-art-illustration-pirate-treasure-chest-clipart-154639&tbnid=KwOq726tMpTc1M&vet=12ahUKEwiWj86n5L74AhWyoukKHa3YD3UQMyggegUIARChAg..i&docid=DGvFAHqbNCSG1M&w=840&h=439&q=treasure&hl=en&ved=2ahUKEwiWj86n5L74AhWyoukKHa3YD3UQMyggegUIARChAg",
        imageSize: "100x100",
        confirmButtonText: "Remove alert"
      });
}

function spawnTreasure(){
    if(frameCount % 1200 === 0){
 
            treasure = createSprite(player.x + 50, player.y + 50)
            treasure.addImage(treasureImg)
            treasure.scale = 0.5
    
            treasureGroup.add(treasure)
            treasure.lifetime = 100
    }

}
function Reset(){
    if(mousePressedOver(reset)){
        gameState = 'PLAY'
        reset.visible = false
    }
}