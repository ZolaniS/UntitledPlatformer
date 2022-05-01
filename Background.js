//LEVEL LOADER LEVEL LOADER LEVEL LOADER LEVEL LOADER LEVEL LOADER LEVEL LOADER
var LevelContents
fetch("Level.json")
.then(response => response.json())
.then(data => {
    LevelContents = data;
    //console.log(LevelContents);
})

function BackGround(lvl){
// LEVEL FINDING # LEVEL FINDING # LEVEL FINDING # LEVEL FINDING # LEVEL FINDING # 
    var rectarray = [];
    var enemyarray = [];
    var enemyArray = [];
    var start = false;//                     TODO
    var line = null;
    var SPAWN = [0,0];
    var lines = LevelContents[lvl]["level"];
    var yOffset = 0; //the offset of y
    var offsety;    // the y that has been offset

    for(var y = 0; y < lines.length; y++){
        var line = lines[y];
        offsety = (y-yOffset);
        for(var x = 0;x<line.length;x+=1){
            var character = line[x];
            //#SPECIAL CASES #SPECIAL CASES #SPECIAL CASES #SPECIAL CASES #
            if (character == " " || character == "_"){
                continue;
            }
            if (character == "n"){
                break;
            }
            else if (character == "*"){
                var SPAWN = [x*stdSize,offsety*stdSize];
            }
            else if (character == "e"){
                L = new Enemy(IMAGEDICT["7"], x*stdSize,offsety*stdSize) //Standard block loading
                L.w = stdSize;
                L.h = stdSize;
                enemyArray.push(L);
            }
            // else if (character.toLowerCase() == "k"){
            //     temp = new HitRect(IMAGEDICT["misc"]["key"], x*stdSize,offsety*stdSize)
            //     temp.imageName = "key";
            //     objarray.push(temp);
            // }
            // else if (character.toLowerCase() == "d"){
            //     temp = new HitRect(IMAGEDICT["misc"]["DoorClosed"], x*stdSize,offsety*stdSize)
            //     temp.imageName = "DoorClosed";
            //     objarray.push(temp);
            // }
            
            else{
                L = new HitRect(IMAGEDICT["5"], x*stdSize,offsety*stdSize) //Standard block loading
                L.w = stdSize;
                L.h = stdSize;
                rectarray.push(L)
            }
//#LEVEL FINDING # LEVEL FINDING # LEVEL FINDING # LEVEL FINDING # LEVEL FINDING # 
        }
        
    }
    return [rectarray, SPAWN, enemyarray];//TODO get rid of level[0] tag remnants (currently null)
}