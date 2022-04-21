const myShip = document.querySelector('.player-shooter')
const playArea = document.querySelector('#main-play-area')

function startGame(){
    document.addEventListener('keyup', flyShip)
    document.addEventListener('keydown', flyShip)
}

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
        position -= 50;
        myShip.style.top = `${position}px`
    }
}

function moveDown(){
    let topPosition = getComputedStyle(myShip).getPropertyValue('top');
    if(topPosition === '510px'){
        return
    }else{
        let position = parseInt(topPosition);
        position += 50;
        myShip.style.top = `${position}px`
    }
}



startGame();