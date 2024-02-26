

let gameModel;
window.onload = function() {

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    gameModel = new GameModel(canvas, context);
    
}
let keysPressed = {};
window.addEventListener('keydown', function(event) {
    keysPressed[event.code] = true;

    


    // Записываем состояние нажатой клавиши в объект keysPressed
    // keysPressed[event.key] = true;
    // // Проверяем сочетание клавиш и выполняем соответствующие действия
    if (keysPressed['KeyA'] && keysPressed['KeyW']) {
        gameModel.gameObjects[0].xDir = -1;
        gameModel.gameObjects[0].yDir = -1;
        gameModel.gameObjects[0].isRight = false;
        // Здесь можете вызвать нужный код для сочетания клавиш
    }
    else if (keysPressed['KeyD'] && keysPressed['KeyW']) {
        gameModel.gameObjects[0].xDir = 1;
        gameModel.gameObjects[0].yDir = -1;
        gameModel.gameObjects[0].isRight = true;
        // Здесь можете вызвать нужный код для сочетания клавиш
    }
    else if (keysPressed['KeyD'] && keysPressed['KeyA']) {
        gameModel.gameObjects[0].xDir = 0;
        gameModel.gameObjects[0].isRight = !gameModel.gameObjects[0].isRight;
        // Здесь можете вызвать нужный код для сочетания клавиш
    }
    else if(event.code == 'KeyW'){
        gameModel.gameObjects[0].yDir = -1;
    }
    else if(event.code == 'KeyS'){
        gameModel.gameObjects[0].yDir = 1;
    }
    else if(event.code == 'KeyA'){
        gameModel.gameObjects[0].xDir = -1;
        gameModel.gameObjects[0].isRight = false;
    }
    else if(event.code == 'KeyD'){
        gameModel.gameObjects[0].xDir = 1;
        gameModel.gameObjects[0].isRight = true;
    }
    else if(event.code == 'Space'){
        gameModel.gameObjects[0].jump = 1;
        console.log("jump");
    }
    
});

// Добавляем обработчик события keyup
window.addEventListener('keyup', function(event) {
    // Удаляем состояние клавиши из объекта keysPressed при отпускании
    delete keysPressed[event.code];
    if (event.code == 'KeyA') {
        gameModel.gameObjects[0].xDir += 1;
        
    }
    else if (event.code == 'KeyD') {
        gameModel.gameObjects[0].xDir -= 1 ;
        
    }
    else if(event.code == 'KeyW' || event.code == 'KeyS'){
        gameModel.gameObjects[0].yDir = 0;
        
    }
    else if(event.code == 'Space'){
        gameModel.gameObjects[0].jump = 0;
        gameModel.gameObjects[0].jumpSpeed = 0;
    }
    
});

