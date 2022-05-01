//initializing the canvas
var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight-6;
canvas.width = canvas.height*16/9;
var c = canvas.getContext("2d");
//the keypresses array keeps track of which keys are pressed and handles pause via "R"
var keypress = {"Right":false, "Left":false, "Up":false, "Down":false};
window.addEventListener("keydown", function(e){
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d"){
        keypress["Right"] = true;
    }
    if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a"){
        keypress["Left"] = true;
    }
    if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
        keypress["Up"] = true;
    }
    if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
        keypress["Down"] = true;
    }
    //TODO implement pause implementation that doesn't restart level
    //if r is pressed and the game is not paused, they will kill the player in order to pause it.
    //If paused, will click resume button
    if (e.key == "r"){
        if (Player.health <= 0){
            console.log("Unpaused")
            var event = new MouseEvent("click", {
                view     : window,
                bubbles: true,
                cancelable: true,
                clientX : (90+1),//TODO Hard coded resume coords
                clientY : (190-64+1)
            });
            window.document.dispatchEvent(event);
        }
        else{
            Player.health = 0
        }
    }
});
window.addEventListener("keyup", function(e){
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d"){
        keypress["Right"] = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a"){
        keypress["Left"] = false;
    }
    if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
        keypress["Up"] = false;
    }
    if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
        keypress["Down"] = false;
    }
});
window.onblur = function(){//TODO make key presses reset when you change tab
    console.log("lost focus");
    keypress = {"Right":false, "Left":false, "Up":false, "Down":false};
};
window.onresize = function(){
    canvas.height = window.innerHeight -16;
    canvas.width = canvas.height*16/9;
};
//Makes sure that all the assets are loaded before going on to tile screen
function start(){
    loaded = true
    for (const item in IMAGEDICT){
        if (IMAGEDICT[item].complete == false){
            loaded = false;
        }

    }
    if (LevelContents == null){
        loaded = false;
    }
    if (loaded == false){
        window.setTimeout(start,100);
    }
    else{
        Title("Platformer Base", "Start")
    }
}
onload = function () {
  start();
}