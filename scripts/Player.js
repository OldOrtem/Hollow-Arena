
class Player extends GameObject{
    
    constructor(x, y, width, height) {
        super(x, y, width, height)
        this.color = "white"
        this.fallingSpeed = 0;
        this.jumpSpeed = 1000;
        this.shiftX = 200;
        this.shiftY = 500;
        this.jump = 0;
        this.frame = 0;
        this.img = new Image();
        this.img.src = "img/stand1.png";
        this.isRight = true;
    }

    update(timePassed){
        super.update(timePassed);
        
        if (this.xDir != 0){
            this.img.src = "img/go" + this.xDir*(this.frame+1)+ ".png";
            this.frame  =  (this.frame + 1 ) % 8;
        }
        else{
            if (this.isRight){
                this.img.src = "img/stand1.png";
            }
            else{
                this.img.src = "img/stand-1.png";
            }
        }
        this.x += this.xDir * this.shiftX * timePassed;

        if (this.jumpSpeed > 0 && this.jump > 0){
            this.y -= Math.round((this.jumpSpeed*timePassed));
            this.jumpSpeed -= (9.8*150*timePassed);
            if (this.isRight){
                this.img.src = "img/jump1.png";
            }
            else{
                this.img.src = "img/jump-1.png";
            }
            
        }
        else if(this.y < 880-this.heigth && (this.jump == 0 || this.jumpSpeed <= 0)){
            this.y += Math.round((this.fallingSpeed*timePassed));
            this.fallingSpeed += (9.8*150*timePassed);
            if (this.isRight){
                this.img.src = "img/fall1.png";
            }
            else{
                this.img.src = "img/fall-1.png";
            }
        }
        else{
            if (this.jump  == 0){
                this.jumpSpeed = 1000;
            }
            
            this.fallingSpeed = 0;
            this.y = 880-this.heigth
        }
         
        
        

    }

    draw(context){
        super.draw(context);
        // context.fillStyle = this.color;
        // context.fill();
        context.drawImage(this.img, this.x, this.y, this.width, this.heigth);
    }

    
}

