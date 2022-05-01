class PlayerRect extends HitRect{
    constructor(image, x, y) {
        super(image,x,y)
        this.image =    image;
        this.x =        x;//x coord
        this.y =        y;//y coord
        this.velx=      0;//x velocity
        this.vely=      0;//y velocity
        this.offsetx =  0;
        this.offsety =  0;
        this.w =        image.width;
        this.h =        image.height;
        this.flag = false;
        this.grounded = 0;
        this.jump = 0;
        this.health = 3;
        this.iframes= 0
        this.imageArray =[];
        this.hits = []
    }
    move(rectlist, dt){
        
        //INPUT HANDLING INPUT HANDLING INPUT HANDLING 
        
        if (keypress["Left"]){
            this.velx = (this.velx-3)/1.4;
        }
        else if (keypress["Right"]){
            this.velx = (this.velx+3)/1.4;
        }
        else{
            this.velx *= 0.49;
        }
        if (keypress["Up"]){
            this.jump = 6;
        }
        else if (this.jump > 0){
            this.jump -= 1;
        }
        if (!keypress["Up"] && this.vely < 0){//WARNING external vertical movement will be stuntet if up is not held
            this.vely +=2
            console.log("damping")
        }
        else if (keypress["Down"]){
            //TODO dimension shift
        }

        if (this.jump && this.grounded){
            this.vely = -24;
            this.grounded = 0
        }
        //Applies Gravity then moves vertically
        this.vely+=2;
        this.y+=this.vely;

        this.hits = this.collideList(rectlist)
        this.flag = this.hits.length > 0 && (this.hits[this.hits.length-1].y) > (this.y+this.h-this.vely);
        if (this.flag)  this.grounded =12;//Coyote Timer
        else if (this.grounded <= 0) this.grounded = 0;
        else if (!this.flag) this.grounded-=1;
        
        //COLLISION DETECTION
        if (this.hits.length > 0 && this.vely != 0){
            this.y -= this.vely;
            this.vely = this.vely*0.49;
            //TODO reset boundaries of clipping boundaries.
        }
        this.hits = this.collideList(rectlist)
        if (this.hits.length > 0 && this.velx != 0){
            this.velx = this.velx*-1
        }

        

        return this.x, this.y
    }
    draw(){
        c.drawImage(this.image,this.x,this.y);
    }
}