const myShip = document.querySelector('.player-shooter')
const playArea = document.querySelector('#main-play-area')
const enemiesShips = ['images/nave1.png', 'images/nave2.png', 'images/nave3.png']
const instructionsText = document.querySelector('.game-instructions')
const startButton = document.querySelector('.start-button')
let shipInterval;


function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

function moveUp(){
    let topPosition = getComputedStyle(myShip).getPropertyValue('top');
    if(topPosition === '0px'){
        return
    }else{
        let position = parseInt(topPosition);
        position -=50;
        myShip.style.top = `${position}px`
    }
}

function moveDown(){
    let topPosition = getComputedStyle(myShip).getPropertyValue('top');
    if(topPosition === '550px'){
        return
    }else{
        let position = parseInt(topPosition);
        position +=50;
        myShip.style.top = `${position}px`
    }
}

function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser)
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(myShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(myShip).getPropertyValue('top'))
    let newLaser = document.createElement('img');
    newLaser.src = "images/tiro.png"
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition -10}px`
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(()=>{
        let xPosition = parseInt(laser.style.left);
        let ships = document.querySelectorAll('.ships');

        ships.forEach((ships) =>{
            if(checkLaserCollision(laser, ships)){
                ships.src = "images/explosao.png"
                ships.classList.remove('ships');
                ships.classList.add('dead-ship');
            }
        });

        if(xPosition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xPosition + 8}px`
        }
    }, 10);
}

function createEnemiesShips(){
    let newEnemieShip = document.createElement('img');
    let shipSprite = enemiesShips[Math.floor(Math.random()* enemiesShips.length)];
    newEnemieShip.src = shipSprite;
    newEnemieShip.classList.add('ships');
    newEnemieShip.classList.add('ships-transition');
    newEnemieShip.style.left = '370px';
    newEnemieShip.style.top = `${Math.floor(Math.random() * 300) + 40}px`;
    playArea.appendChild(newEnemieShip);
    moveShip(newEnemieShip);
}

function moveShip(ships){
    let moveshipInterval = setInterval(()=>{
        let xPosition = parseInt(window.getComputedStyle(ships).getPropertyValue('left'))
        if(xPosition <=50){
            if(Array.from(ships.classList).includes('dead-ship')){
                ships.remove();
            }else{
                gameOver();
            }
        }else{
            ships.style.left = `${xPosition - 4}px`
        }
    }, 30);
}


function checkLaserCollision(laser, ships){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;

    let shipTop = parseInt(ships.style.top);
    let shipLeft = parseInt(ships.style.left);
    let shipBottom = shipTop - 30;
    if(laserLeft !=340 && laserLeft + 40 >= shipLeft){
        if(laserTop <= shipTop && laserTop >= shipBottom){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

startButton.addEventListener('click', (event) =>{
    playGame();
})

function playGame(){
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    shipInterval = setInterval(()=>{
        createEnemiesShips();
    },2000)
}



function gameOver(){
    window.removeEventListener('keydown', flyShip);
    clearInterval(shipInterval);
    let ships = document.querySelectorAll('.ships');
    ships.forEach((ship) => ship.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() =>{
        alert('Game Over!')
        myShip.style.top = '250px';
        startButton.style.display ='block';
        instructionsText.style.display ='block';

    })

}


