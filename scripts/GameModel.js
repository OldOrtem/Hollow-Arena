class GameModel{

    constructor(canvas, context){
        this.gameObjects = [ new Player(100, 880 - 50, 50, 100), new GameObject(200, 880 - 50, 40, 50)];
        this.canvas = canvas;
        this.context = context;
        
        this.t = Date.now();
        this.timePassed = 0;
       

        this.gameLoop = this.gameLoop.bind(this); // Привязываем контекст для метода gameLoop
        this.gameLoop(); // Запускаем игровой цикл
    }

   

    update(){
        
        for (let obj of this.gameObjects) {
            obj.update(this.timePassed);
        }
    }

    draw(){

        this.context.clearRect(0,0,1920,880);

        this.context.font = '25px Arial';
        this.context.fillStyle = "white";
        this.context.fillText("fps: " + Math.round(1/this.timePassed), 20, 30);
        

        for (let obj of this.gameObjects) {
            obj.draw(this.context);
        }

    }

    gameLoop(){
        this.timePassed = (Date.now()-this.t) / 1000;
        
        this.t = Date.now();

        this.update();
        this.draw();
        window.requestAnimationFrame(this.gameLoop);
    }
}