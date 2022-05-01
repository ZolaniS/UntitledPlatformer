var time; var deltaTime = 15;//Used to fix movement speed regardless of FPS
var enemyArray; 
var offset = {"x": 0, "y": 0};
var Player;
var loadLevel = true;
function main() {
    time = new Date();
    //loads level into rectarray, enemy array, and resets player
    if (loadLevel){
        L = BackGround("1") //TODO find a way to make this shift levels as needed
        RectArray = L[0];bg = L[3];enemyArray = L[4];
        Player = new PlayerRect(IMAGEDICT["2"], L[1][0], L[1][1]);
        Player.x = canvas.width/4
        loadLevel = false;
    }
    //clears previous frame
    c.clearRect(0,0,canvas.width,canvas.height)
    //TODO implement background
    //
    Player.move(RectArray);
    Player.velx = parseFloat(Player.velx.toPrecision(10));
    Player.vely = parseFloat(Player.vely.toPrecision(10));

    for (var rectindex in RectArray){
        RectArray[rectindex].x-=Player.velx;
        RectArray[rectindex].draw();
    }
    Player.hits = Player.collideList(RectArray);
    if (Player.hits.length > 0){
        c.clearRect(0,0,canvas.width,canvas.height)
        if (Player.velx < 0){//If player moves left into a block
            Player.velx = (Player.hits[0].x+Player.hits[0].w) - Player.x;
        }
        else{                //If player moves right or is still into a block
            Player.velx = Player.hits[Player.hits.length-1].x - (Player.x + Player.w);
        }
        for (var rectindex in RectArray){
            RectArray[rectindex].x-=Player.velx;
            if (RectArray[rectindex].x < canvas.width*1.2 && RectArray[rectindex].x > 0-canvas.width/5)
            RectArray[rectindex].draw();
        }
        Player.velx = 0
    }
    Player.draw();
    offset.x=0;

    // if (shoot){
    // }
    // if (Math.random() < 0.01){
    //     enemyarray.push(new Enemy(IMAGEDICT["sweetpea"]["idle"],Math.random()*canvas.width,Math.random()*canvas.height))
    // }
    //console.log(Player.jump)
    if (Player.iframes > 0){
        Player.iframes -=1;
    }
    for (var enemy in enemyArray){
        enemyArray[enemy].x -= Player.velx;
        enemyArray[enemy].originx -= Player.velx;
        enemyArray[enemy].update(RectArray);
        if (enemyArray[enemy].collideRect(Player) && Player.iframes == 0){
            Player.health -= 1;
            Player.iframes = 20;
        }
        enemyArray[enemy].draw();
    }
    //UI UI UI UI UI UI UI UI UI UI UI UI UI UI UI UI UI UI UI UI
    UI(Player.health,Player.jump)
    //DEATH CHECK DEATH CHECK DEATH CHECK
    if (Player.y > canvas.height || Player.health <=0){
        console.log("Paused");
        Player.health = -1*Math.abs(Player.health);
        loadLevel=true;
        Title("Game Over", "Restart");
    }
    else{
        window.requestAnimationFrame(main);//Set second number in milliseconds before loop
    }
  }