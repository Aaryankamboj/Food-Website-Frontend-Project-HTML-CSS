// Game Constants and variables
let inputdir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 8;
let score=0;
let lastPaintTime = 0;
let snakearr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // If you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snakearr[0].x >= 18 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0) {
        return true;

    }
}

function gameEngine() {
    // Part1 : Updating the snake array and food
    if (isCollide(snakearr)) {
        gameOverSound.play();
        musicSound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again");
        snakearr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }

    //  If you have eaten the food, increment the score and regenerate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="High score: "+hiscoreval;

        }
        scoreBox.innerHTML="Score : "+score;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x = snakearr[0].x + inputdir.x;
    snakearr[0].y = snakearr[0].y + inputdir.y;



    // Part2 : Display the snake and foodd
    // Display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main Logic Starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore=== null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))

}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }  // start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrowleft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrowright");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});