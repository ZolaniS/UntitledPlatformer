
function Title(topText, bottomText){//When you click the start button, enter the main loop.
    function mm(e){
        if (clickBox[0] < e.x && e.x < clickBox[2] && clickBox[1] < e.y && e.y < clickBox[3]){
            c.fillStyle = "rgba(255,115,115,0.5)";
            c.fillText(bottomText, 100,200);
        }
        else{
            c.fillStyle = "rgb(125,25,25)";
            c.fillText(bottomText, 100,200);
        }
    }
    function cl(e){
        if (clickBox[0] < e.x && e.x < clickBox[2] && clickBox[1] < e.y && e.y < clickBox[3]){
            document.removeEventListener("mousemove", mm, false);
            document.removeEventListener("click", cl, false);
            main();
        }
    }
    c.clearRect(0,0,canvas.width,canvas.height);

    c.fillStyle = "rgb(125,25,25)";
    c.font = "128px serif";
    c.fillText(topText, 100,100);
    c.font = "64px sans";
    c.fillText(bottomText, 100,200);

    var clickBox = [90,190-64,110+c.measureText(bottomText).width,210];
    document.addEventListener("mousemove",mm,false);
    document.addEventListener("click",cl,false);
}