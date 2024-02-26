class GameObject {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = height;
        this.timePassed = 0;
        this.shiftX = 0;
        this.shiftY = 0;
        this.xDir = 0;
        this.yDir = 0;
    }

    collision(GameObject){

    }

    update(timePassed){
    
        this.timePassed = timePassed;
        
    }

    draw(context){
        // context.beginPath();
        // context.rect(this.x, this.y, this.width, this.heigth);
        // context.fillStyle = "red";
        // context.fill();
    }

    move(moveX, moveY){
        
        this.x += moveX;
        this.y += moveY;
    }
}

