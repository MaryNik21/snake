//рисуем пустые клетки и добавляем div-ы
//сюда не дышим, всё работает
function initField(x, y){
    for (let i = 1; i <= y; i++){
        for (let j = 1; j <= x; j++){
            const field = document.querySelector("#field");
            const div = document.createElement("div");
            div.classList.add("empty-cell");
            div.dataset.x = `${j}`;
            div.dataset.y = `${i}`;
            field.appendChild(div);
        }
    }
}
let column = 10;
let string = 10;
initField(column, string);

let moveDirection = {x:0, y:0};

let score = 0;
let bestScore = 0;

let speed = 5;
let lastPaintTime = 0;

let apple = {
    x: Math.floor(Math.random() * 10 + 1),
    y: Math.floor(Math.random() * 10 + 1),
}

//делаем функцию, чтобы она вообще отрисовывала анимацию
function main(currentTime){
    window.requestAnimationFrame(main);
    //console.log(currentTime)
    if((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime
    initGame();
}


//функция для отображения игры на сайте, тут у нас: поле, змейка и яблоко
function initGame(){
    let inputDirection = {x:0, y:0};

    //рисуем отображение змейки
    let snake = [
    {
        x: 5,
        y: 5
    },
    {
        x: 4,
        y: 5
    },
    {
        x: 3,
        y: 5
    },
    ];

    function initSnake(){
        snake.forEach((e, index) =>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            field.appendChild(snakeElement);

            if(index === 0){
                    snakeElement.classList.add('snake-head');
            }else{
                    snakeElement.classList.add('snake-body');
            }
        })
    }
    //функция для отображения яблока на поле
    function drawFood(x, y){
        let activeCell = document.querySelector(`.empty-cell[data-x = "${x}"][data-y = "${y}"]`);
        activeCell.classList.add("active");
    };

    //отображаем текущий счёт
    function initScore(){
        const formScore = document.querySelector(".total-score");
        formScore.innerHTML = `<p>${score}</p>`;

        const formBestScore = document.querySelector(".best-score");
        formBestScore.innerHTML = `<p>${bestScore}</p>`;
    }

    function moveSnake(){
        for(let i = snake.length - 2; i >= 0; i--){
            snake[i + 1] = {...snake[i]}
        }
        snake[0].x += inputDirection.x;
        snake[0].y += inputDirection.y;
    }

    window.addEventListener('keydown', (e) => {
        inputDirection = {x:0, y:1} 
        switch(e.key){
            case "ArrowUp":
                // console.log('ArrowUp');
                inputDirection.x = 0;
                inputDirection.y = -1;
                break;
            case "40":
                // console.log('ArrowDown');
                inputDirection.x = 0;
                inputDirection.y = 1;
                break;
            case "37":
                // console.log('ArrowLeft');
                inputDirection.x = -1;
                inputDirection.y = 0;
                break;
            case "ArrowRight":
                // console.log('ArrowRight');
                inputDirection.x = 1;
                inputDirection.y = 0;
                break;
        }
        moveSnake();
    })
    

    initSnake();
    drawFood(apple.x, apple.y);
    initScore();
    moveSnake();

    }

    window.requestAnimationFrame(main);


//запускаем при открытии сайта
document.addEventListener("DOMContentLoaded", () => {
    initGame();

})