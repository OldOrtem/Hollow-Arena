


class Player extends GameObject{
    
    constructor(x, y, width, height) {
        super(x, y, width, height)

        function createImage(src) {
            const img = new Image();
            img.src = src;
            return img;
        }

        this.imageCollections = {

            dead: createImage("img/players/1/dead.png"),
            stand: {
                left: createImage("img/players/1/stand/stand-1.png"),
                right: createImage("img/players/1/stand/stand1.png"),
                leftUp: createImage("img/players/1/stand/standUp-1.png"),
                leftDown: createImage("img/players/1/stand/standDown-1.png"),
                rightUp: createImage("img/players/1/stand/standUp1.png"),
                rightDown: createImage("img/players/1/stand/standDown1.png"),
            },
            walk: {
                left:(() => {
                    const images = [];
                    for (let i = 1; i <= 8; i++) {
                        if (i !== 0) {
                            images.push(createImage(`img/players/1/walk/go-${i}.png`));
                        }
                    }
                    return images;
                })(),
                right: (() => {
                    const images = [];
                    for (let i = 1; i <= 8; i++) {
                        if (i !== 0) {
                            images.push(createImage(`img/players/1/walk/go${i}.png`));
                        }
                    }
                    return images;
                })(),
            },
            jump: {
                left: createImage("img/players/1/jump/jump-1.png"),
                right: createImage("img/players/1/jump/jump1.png"),
            },
            fall: {
                left: createImage("img/players/1/fall/fall-1.png"),
                right: createImage("img/players/1/fall/fall1.png"),
            },
            attack: {
                left: createImage("img/players/1/attack/attackLeft.png"),
                right: createImage("img/players/1/attack/attackRight.png"),
                up: createImage("img/players/1/attack/attackUp.png"),
                down: createImage("img/players/1/attack/attackDown.png"),
            },
        };
        
        this.hp = 10;
        this.isAttack = false;
        this.color = "white"
        this.fallingSpeed = 0;
        this.jumpSpeed = 1000;
        this.shiftX = 200;
        this.shiftY = 500;
        this.jump = 0;
        this.frame = 0;
        this.img = this.imageCollections.stand.right;
        this.isRight = true;
        
    }

    lostHP(dir){
        this.hp -= 1;
        if (dir){
            this.x += 10;
        }
        else{
            this.x -= 10;
        }
    }

    attack(enemy){
        
        enemy.lostHP(this.isRight);
        if (this.isRight){
            this.x -= 10;
        }
        else{
            this.x += 10;
        }
    }

    update(timePassed){
        super.update(timePassed);
        if (this.hp > 0){

        
            if (this.xDir != 0){
                if (this.isRight){
                    this.img = this.imageCollections.walk.right[this.frame];
                }
                else{
                    this.img = this.imageCollections.walk.left[this.frame];
                }
                this.frame  =  (this.frame + 1 ) % 8;
            }
            else{
                if (this.isRight){
                    if (this.yDir == 1){
                        this.img = this.imageCollections.stand.rightDown;
                    }
                    else if (this.yDir == -1){
                        this.img = this.imageCollections.stand.rightUp;
                    }
                    else{
                        this.img = this.imageCollections.stand.right;
                    }
                    
                }
                else{
                    if (this.yDir == 1){
                        this.img = this.imageCollections.stand.leftDown;
                    }
                    else if (this.yDir == -1){
                        this.img = this.imageCollections.stand.leftUp;
                    }
                    else{
                        this.img = this.imageCollections.stand.left;
                    }
                    
                }
            }
            this.x += this.xDir * this.shiftX * timePassed;

            if (this.jumpSpeed > 0 && this.jump > 0){
                this.y -= Math.round((this.jumpSpeed*timePassed));
                this.jumpSpeed -= (9.8*150*timePassed);
                if (this.isRight){
                    this.img = this.imageCollections.jump.right;
                }
                else{
                    this.img = this.imageCollections.jump.left;
                }
                
            }
            else if(this.y < 880-this.heigth && (this.jump == 0 || this.jumpSpeed <= 0)){
                this.y += Math.round((this.fallingSpeed*timePassed));
                this.fallingSpeed += (9.8*150*timePassed);
                if (this.isRight){
                    this.img = this.imageCollections.fall.right;
                }
                else{
                    this.img = this.imageCollections.fall.left;
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
        else{
            this.imageCollections.dead;
        }
        

    }

    draw(context){
        super.draw(context);
        // context.fillStyle = this.color;
        // context.fill();
        if (this.hp > 0){
            context.drawImage(this.img, this.x, this.y, this.width, this.heigth);
        }
        else{
            context.drawImage(this.imageCollections.dead, this.x, this.y, this.width, this.heigth);
        }
        
        if (this.isAttack && this.hp > 0){
            if (this.yDir == -1){
                context.drawImage(this.imageCollections.attack.up, this.x+7, this.y-110+this.heigth/2, 60, 110);
            }
            else if (this.yDir == 1){
                context.drawImage(this.imageCollections.attack.down, this.x+7, this.y+this.heigth/2, 60, 110);
            }
            else{
                if (this.isRight){
                    context.drawImage(this.imageCollections.attack.right, this.x+this.width/2, this.y+20, 110, 80);
                }
                else{
                    context.drawImage(this.imageCollections.attack.left, this.x+this.width/2 - 110, this.y+20, 110, 80);
                }
            }
            this.isAttack = false;
        }
    }

    
}

