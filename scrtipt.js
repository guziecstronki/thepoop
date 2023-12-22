const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
let tlo = new Image()
tlo.src = 'img/toaleta5.jpg';
const getHeight = () => window.innerHeight;
const getWidth = () => window.innerWidth;

setInterval(() => {
    tlo.src = 'img/toaleta5.jpg';
}, 10000)

// wysokosc i szerokosc w pixelach
const canvasSize = () => {
    canvas.height = getHeight()
    canvas.width = getWidth()
}

// wyoskosc w procentach
const procentW = () =>{
    let procent = getWidth() / 100
    return procent
}

// szerokosc w procentach
const procentH = () =>{
    let procent = getHeight() / 100
    return procent
}

const normalPlatforms = [
    { x: 18, y: 150, width: 10, height: 2.5 },
    { x: 35, y: 120, width: 8, height: 2.5 },
    { x: 55, y: 150, width: 10, height: 2.5 },
    { x: 75, y: 120, width: 10, height: 2.5 },
    { x: 33, y: 70, width: 8, height: 2.5 },
    { x: 15, y: 50, width: 8, height: 2.5 },
    { x: 52, y: 50, width: 20, height: 2.5 },
];
const specialPlatforms = [
    { x: 15, y: 90, width: 10, height: 1.5 },
    { x: 55, y: 90, width: 8, height: 1.5 },
    { x: 80, y: 60, width: 5, height: 1.5 },
];
const floor =[
    { x: 10, y: 173, width: 80, height: 1.5 },
    { x: 10, y: 14, width: 80, height: 1.5 },
]

const display = () => {
    ctx.drawImage(tlo, procentW() * 10 ,(getHeight() - (getWidth() - (procentW() * 20)) / 2)/2,getWidth() - (procentW() * 20),(getWidth() - (procentW() * 20)) / 2)
}

let draw = setInterval(drawAll, 16)

// user1 sterowanie

// startowa pozycja
let x1 =  20
let y1 = 160
let widthu1 = 2
let heightu1 = 4
let moveUser1

let postac1 = new Image()
postac1.src = 'img/postac1S.png'

let postac1Zwrot
let postac1Ruch1P
let postac1Ruch2P
let postac1Ruch1L
let postac1Ruch2L

const user1Draw = () => {
    if(postac1Zwrot == true && !postac1Ruch1P && !postac1Ruch2P && isShottingUser1){
        clearInterval(postac1Ruch1L)
        postac1Ruch1L = null
        clearInterval(postac1Ruch2L)
        postac1Ruch2L = null
        postac1Ruch1P = setInterval(() =>{
            postac1.src = 'img/postac1P1.png'
        }, 256)
        setTimeout(() => {
            postac1Ruch2P = setInterval(() =>{
            postac1.src = 'img/postac1P2.png'
        }, 256)
        }, 128)
        widthu1 = 2
        heightu1 = 4
    } else if(postac1Zwrot == false && !postac1Ruch1L && !postac1Ruch2L && isShottingUser1){
        clearInterval(postac1Ruch1P)
        postac1Ruch1P = null
        clearInterval(postac1Ruch2P)
        postac1Ruch2P = null
        postac1Ruch1L = setInterval(() =>{
            postac1.src = 'img/postac1L1.png'
        }, 256)
        setTimeout(() => {
            postac1Ruch2L= setInterval(() =>{
            postac1.src = 'img/postac1L2.png'
        }, 256)
        }, 128)
        widthu1 = 2
        heightu1 = 4
    }  else if (!isShottingUser1){
        if(lastKeyR){
            postac1.src = 'img/postac1ShotP.png'
        }
        if(lastKeyL){
            postac1.src = 'img/postac1ShotL.png'
        }
        widthu1 = 3
        heightu1 = 4
    } else if (postac1Zwrot == 'spoczynek'){
        clearInterval(postac1Ruch1P)
        postac1Ruch1P = null
        clearInterval(postac1Ruch2P)
        postac1Ruch2P = null
        clearInterval(postac1Ruch1L)
        postac1Ruch1L = null
        clearInterval(postac1Ruch2L)
        postac1Ruch2L = null
        postac1.src = 'img/postac1S.png'
        widthu1 = 2
        heightu1 = 4
    }
    ctx.drawImage(postac1, procentW() * x1 ,(getHeight() - (getWidth() - (procentW() * y1)) / 2)/2, procentW() * widthu1,procentW() * heightu1)
}

// sterowanie lewo prawo


let leftArrowPressed = false
let rightArrowPressed = false
let pressL = false
let pressR = false
let lastKeyL = false
let lastKeyR = true


document.addEventListener('keydown', (e) => {
    if(e.key == 'ArrowLeft'){
        leftArrowPressed = true
        pressL = true
        if(lastKeyR){
            lastKeyR = false
        }
        if(!lastKeyL){
            lastKeyL = true
        }
        if(postac1Zwrot == 'spoczynek'){
            postac1.src = 'img/postac1L1.png'
        }
        postac1Zwrot = false
    } else if(e.key == 'ArrowRight'){
        rightArrowPressed = true
        pressR = true
        if(!lastKeyR){
            lastKeyR = true
        }
        if(lastKeyL){
            lastKeyL = false
        }
        if(postac1Zwrot == 'spoczynek'){
            postac1.src = 'img/postac1P1.png'
        }
        postac1Zwrot = true
    }
    if (leftArrowPressed || rightArrowPressed) {
        if (!moveUser1) {
            moveUser1 = setInterval(moveUser1Function, 16);
        }
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        leftArrowPressed = false;
        pressL = false
        postac1Zwrot = 'spoczynek'
    } else if (e.key === 'ArrowRight') {
        rightArrowPressed = false;
        pressR = false
        postac1Zwrot = 'spoczynek'
    }
    if (!leftArrowPressed && !rightArrowPressed) {
        clearInterval(moveUser1);
        moveUser1 = null;
    }
})

function moveUser1Function() {
    if(leftArrowPressed == true && x1 > 10){
        x1 += -0.5
        checkForCollisionMoveUser1()
        checkForColisionBokUser1()
        foodCollisionUser1()
    } else if(rightArrowPressed == true && x1 < 88){
        x1 += 0.5
        checkForCollisionMoveUser1()
        checkForColisionBokUser1()
        foodCollisionUser1()
    }
}

// sterowanie skok

let upArrowPressed = false
let jumpUser1
let fallUser1
let beforeJumpUser1 = y1
let jumpHighUser1 = y1 - 40

document.addEventListener('keydown', (e) => {
    if(e.key == 'ArrowUp'){
        upArrowPressed = true
    }
    if(upArrowPressed && y1 === beforeJumpUser1 && !jumpUser1){
        jumpUser1 = setInterval(jumpUser1Function, 16)
    }
    
    
})

document.addEventListener('keyup', (e) => {
    if(e.key == 'ArrowUp'){
    upArrowPressed = false
    if(!upArrowPressed && jumpUser1 && !fallUser1){
        clearInterval(jumpUser1)
        jumpUser1 = null
        if(y1 != beforeJumpUser1){
            fallUser1 = setInterval(fallUser1Function, 16)
        }
    }
    }
})

function jumpUser1Function() {
    checkForCollisionJumpUser1()
    checkForColisionBokUser1()
    foodCollisionUser1()
    y1 += -2
    if(y1 === jumpHighUser1 && !fallUser1){
        clearInterval(jumpUser1)
        jumpUser1 = null
        fallUser1 = setInterval(fallUser1Function, 16)
    }
}

function fallUser1Function() {
    if(y1 < beforeJumpUser1){
        checkForCollisionFallUser1()
        checkForColisionBokUser1()
        foodCollisionUser1()
        y1 += 2
    }
    if(y1 === beforeJumpUser1 || !fallUser1){
        clearInterval(fallUser1)
        fallUser1 = null
        if(upArrowPressed && !jumpUser1){
            jumpUser1 = setInterval(jumpUser1Function, 16)
        }
        beforeJumpUser1 = y1
        jumpHighUser1 = y1 - 50
    }
}



// user2 sterowanie

// startowa pozycja   
let x2 = 60
let y2 = 160
let widthu2 = 2
let heightu2 = 4
let moveUser2


let postac2 = new Image()
postac2.src = 'img/postac2S.png'

let postac2Zwrot
let postac2Ruch1P
let postac2Ruch2P
let postac2Ruch1L
let postac2Ruch2L

const user2Draw = () => {
    if(postac2Zwrot == true && !postac2Ruch1P && !postac2Ruch2P && isShottingUser2){
        clearInterval(postac2Ruch1L)
        postac2Ruch1L = null
        clearInterval(postac2Ruch2L)
        postac2Ruch2L = null
        postac2Ruch1P = setInterval(() =>{
            postac2.src = 'img/postac2P1.png'
        }, 256)
        setTimeout(() => {
            postac2Ruch2P = setInterval(() =>{
            postac2.src = 'img/postac2P2.png'
        }, 256)
        }, 128)
        widthu2 = 2
        heightu2 = 4
    } else if(postac2Zwrot == false && !postac2Ruch1L && !postac2Ruch2L && isShottingUser2){
        clearInterval(postac2Ruch1P)
        postac2Ruch1P = null
        clearInterval(postac2Ruch2P)
        postac2Ruch2P = null
        postac2Ruch1L = setInterval(() =>{
            postac2.src = 'img/postac2L1.png'
        }, 256)
        setTimeout(() => {
            postac2Ruch2L= setInterval(() =>{
            postac2.src = 'img/postac2L2.png'
        }, 256)
        }, 128)
        widthu2 = 2
        heightu2 = 4
    } else if (!isShottingUser2){
        if(lastKeyRu2){
            postac2.src = 'img/postac2ShotP.png'
        }
        if(lastKeyLu2){
            postac2.src = 'img/postac2ShotL.png'
        }
        widthu2 = 3
        heightu2 = 4
    } else if (postac2Zwrot == 'spoczynek'){
        clearInterval(postac2Ruch1P)
        postac2Ruch1P = null
        clearInterval(postac2Ruch2P)
        postac2Ruch2P = null
        clearInterval(postac2Ruch1L)
        postac2Ruch1L = null
        clearInterval(postac2Ruch2L)
        postac2Ruch2L = null
        postac2.src = 'img/postac2S.png'
        widthu2 = 2
        heightu2 = 4
    }
    ctx.drawImage(postac2 ,procentW() * x2 ,(getHeight() - (getWidth() - (procentW() * y2)) / 2)/2, procentW() * widthu2,procentW() * heightu2)
}

// sterowanie lewo prawo
let aPressed = false;
let dPressed = false;
let pressLu2 = false;
let pressRu2 = false;
let lastKeyLu2 = true
let lastKeyRu2 = false

document.addEventListener('keydown', (e) => {
    if (e.key === 'a') {
        aPressed = true;
        pressLu2 = true;
        if(lastKeyRu2){
            lastKeyRu2 = false
        }
        if(!lastKeyLu2){
            lastKeyLu2 = true
        }
        if(postac2Zwrot == 'spoczynek'){
            postac2.src = 'img/postac2L1.png'
        }
        postac2Zwrot = false
    } else if (e.key === 'd') {
        dPressed = true;
        pressRu2 = true;
        if(!lastKeyRu2){
            lastKeyRu2 = true
        }
        if(lastKeyLu2){
            lastKeyLu2 = false
        }
        if(postac2Zwrot == 'spoczynek'){
            postac2.src = 'img/postac2P1.png'
        }
        postac2Zwrot = true
    }
    if (aPressed || dPressed) {
        if (!moveUser2) {
            moveUser2 = setInterval(moveUser2Function, 16);
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'a') {
        aPressed = false;
        pressLu2 = false;
        postac2Zwrot = 'spoczynek'
    } else if (e.key === 'd') {
        dPressed = false;
        pressRu2 = false;
        postac2Zwrot = 'spoczynek'
    }
    if (!aPressed && !dPressed) {
        clearInterval(moveUser2);
        moveUser2 = null;
    }
});

function moveUser2Function() {
    if (aPressed && x2 > 10) {
        x2 += -0.5;
        checkForCollisionMoveUser2();
        checkForCollisionBokUser2();
        foodCollisionUser2()
    } else if (dPressed && x2 < 88) {
        x2 += 0.5;
        checkForCollisionMoveUser2();
        checkForCollisionBokUser2();
        foodCollisionUser2()
    }
}

// skok

let wPressed = false;
let jumpUser2;
let fallUser2;
let beforeJumpUser2 = y2;
let jumpHighUser2 = y2 - 40;

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        wPressed = true;
    }
    if (wPressed && y2 === beforeJumpUser2 && !jumpUser2) {
        jumpUser2 = setInterval(jumpUser2Function, 16);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') {
        wPressed = false;
        if (!wPressed && jumpUser2 && !fallUser2) {
            clearInterval(jumpUser2);
            jumpUser2 = null;
            if (y2 !== beforeJumpUser2) {
                fallUser2 = setInterval(fallUser2Function, 16);
            }
        }
    }
});

function jumpUser2Function() {
    checkForCollisionJumpUser2();
    checkForCollisionBokUser2();
    foodCollisionUser2()
    y2 += -2;
    if (y2 === jumpHighUser2 && !fallUser2) {
        clearInterval(jumpUser2);
        jumpUser2 = null;
        fallUser2 = setInterval(fallUser2Function, 16);
    }
}

function fallUser2Function() {
    if (y2 < beforeJumpUser2) {
    checkForCollisionFallUser2();
    checkForCollisionBokUser2();
    foodCollisionUser2()
    y2 += 2;
    }
    if (y2 === beforeJumpUser2 || !fallUser2) {
        clearInterval(fallUser2);
        fallUser2 = null;
        if (wPressed && !jumpUser2) {
            jumpUser2 = setInterval(jumpUser2Function, 16);
        }
        beforeJumpUser2 = y2;
        jumpHighUser2 = y2 - 50;
    }
}




// tworzenie platform
let normalPlatform = new Image()
normalPlatform.src = 'img/deseczka.png'

let specialPlatform = new Image()
specialPlatform.src = 'img/stolik.png'

function createNormalPlatform(x, y, w, h) {
    ctx.drawImage(normalPlatform, procentW() * x, (getHeight() - (getWidth() - (procentW() * y)) / 2) / 2, procentW() * w, (procentW()) * h);
}

function createSpecialPlatform(x, y, w, h) {
    ctx.drawImage(specialPlatform, procentW() * x, (getHeight() - (getWidth() - (procentW() * y)) / 2) / 2, procentW() * w, (procentW()) * h);
}

function createFloor(x, y, w, h) {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(procentW() * x, (getHeight() - (getWidth() - (procentW() * y)) / 2) / 2, procentW() * w, (procentW()) * h);
}

// kolizje uzytkownika1 z platfromami

function checkForCollisionJumpUser1() {
    for (let i = 0; i < normalPlatforms.length; i++) {
        if(((y1 == normalPlatforms[i].y + (4 * normalPlatforms[i].height)) &&
        (((x1 + 2)>= normalPlatforms[i].x)) && (x1 <= (normalPlatforms[i].x + normalPlatforms[i].width)))){
            if(jumpUser1){
                clearInterval(jumpUser1)
                jumpUser1 = null
            } 
            if(!fallUser1 && y1 != jumpHighUser1 && upArrowPressed == true){
            fallUser1 = setInterval(fallUser1Function, 16)
            }
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if(((y1 == specialPlatforms[i].y + (4 * specialPlatforms[i].height)) &&
        (((x1 + 2)>= specialPlatforms[i].x)) && (x1 <= (specialPlatforms[i].x + normalPlatforms[i].width)))){
            if(jumpUser1){
                clearInterval(jumpUser1)
                jumpUser1 = null
            } 
            if(!fallUser1 && y1 != jumpHighUser1 && upArrowPressed == true){
            fallUser1 = setInterval(fallUser1Function, 16)
            }
            
        }
    }
        if (y1 - 8 === floor[1].y &&
            x1 + 2 >= floor[1].x &&
            x1 <= floor[1].x + floor[1].width){
                if(jumpUser1){
                    clearInterval(jumpUser1)
                    jumpUser1 = null
                } 
                if(!fallUser1 && y1 != jumpHighUser1 && upArrowPressed == true){
                fallUser1 = setInterval(fallUser1Function, 16)
                }
                
    }
}

function checkForCollisionFallUser1() {
    let floorTouched = false
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y1 + 16 === normalPlatforms[i].y &&
            x1 + 2 >= normalPlatforms[i].x &&
            x1 <= normalPlatforms[i].x + normalPlatforms[i].width) {
                floorTouched = true
            if (fallUser1) {
                clearInterval(fallUser1);
                fallUser1 = null;
            }
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y1 + 16 === specialPlatforms[i].y &&
            x1 + 2 >= specialPlatforms[i].x &&
            x1 <= specialPlatforms[i].x + specialPlatforms[i].width) {
                floorTouched = true
            if (fallUser1) {
                clearInterval(fallUser1);
                fallUser1 = null;
            }
        }
    }
    
    if (y1 + 15 === floor[0].y && x1 + 2 >= floor[0].x && x1 <= floor[0].x + floor[0].width) {
        floorTouched = true;
        clearInterval(fallUser1);
        fallUser1 = null;
    }
    if (!floorTouched && !jumpUser1) {
        beforeJumpUser1 += 2;
    }
}

function checkForCollisionMoveUser1() {
    let floorTouched = false; // Dodaj zmienną, aby śledzić, czy dotknięto podłogi
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y1 + 14 === normalPlatforms[i].y &&
            x1 + 2 >= normalPlatforms[i].x &&
            x1 <= normalPlatforms[i].x + normalPlatforms[i].width) {
                floorTouched = true
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y1 + 14 === specialPlatforms[i].y &&
            x1 + 2 >= specialPlatforms[i].x &&
            x1 <= specialPlatforms[i].x + specialPlatforms[i].width) {
                floorTouched = true
            }
        }
        if (y1 + 13 === floor[0].y && x1 + 2 >= floor[0].x && x1 <= floor[0].x + floor[0].width) {
            floorTouched = true;
        }

    if (!floorTouched && !jumpUser1 && !fallUser1) {
        fallUser1 = setInterval(fallUser1Function, 16)
        beforeJumpUser1 += 2;
    }
}

function checkForColisionBokUser1(){
    let wallTouchedR = false;
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y1 + 2 <= normalPlatforms[i].y + (4 * normalPlatforms[i].height) &&
            y1 + 14 >= normalPlatforms[i].y &&
            x1 === normalPlatforms[i].x + normalPlatforms[i].width) {
                wallTouchedR = true
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y1 + 2 <= specialPlatforms[i].y + (4 * specialPlatforms[i].height) &&
            y1 + 14 >= specialPlatforms[i].y &&
            x1 === specialPlatforms[i].x + specialPlatforms[i].width) {
                wallTouchedR = true
        }
    }
    if(wallTouchedR && leftArrowPressed){
        leftArrowPressed = false;
    }
    if(!wallTouchedR && pressL){
        leftArrowPressed = true;
    }

    let wallTouchedL = false;
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y1 + 2 <= normalPlatforms[i].y + (4 * normalPlatforms[i].height) &&
            y1 + 14 >= normalPlatforms[i].y &&
            x1 + 2 === normalPlatforms[i].x) {
                wallTouchedL = true
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y1 + 2 <= specialPlatforms[i].y + (4 * specialPlatforms[i].height) &&
            y1 + 14 >= specialPlatforms[i].y &&
            x1 + 2 === specialPlatforms[i].x) {
                wallTouchedL = true
        }
    }
    if(wallTouchedL && rightArrowPressed){
        rightArrowPressed = false;
    }
    if(!wallTouchedL && pressR){
        rightArrowPressed = true;
    }    
}

// kolizje uzytkownika2 z platfromami

function checkForCollisionJumpUser2() {
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (((y2 == normalPlatforms[i].y + (4 * normalPlatforms[i].height)) &&
            (((x2 + 2) >= normalPlatforms[i].x)) && (x2 <= (normalPlatforms[i].x + normalPlatforms[i].width)))) {
            if (jumpUser2) {
                clearInterval(jumpUser2);
                jumpUser2 = null;
            }
            if (!fallUser2 && y2 != jumpHighUser2 && wPressed == true) {
                fallUser2 = setInterval(fallUser2Function, 16);
            }
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (((y2 == specialPlatforms[i].y + (4 * specialPlatforms[i].height)) &&
            (((x2 + 2) >= specialPlatforms[i].x)) && (x2 <= (specialPlatforms[i].x + specialPlatforms[i].width)))) {
            if (jumpUser2) {
                clearInterval(jumpUser2);
                jumpUser2 = null;
            }
            if (!fallUser2 && y2 != jumpHighUser2 && wPressed == true) {
                fallUser2 = setInterval(fallUser2Function, 16);
            }
        }
    }
    if (y2 - 8 === floor[1].y &&
        x2 + 2 >= floor[1].x &&
        x2 <= floor[1].x + floor[1].width) {
        if (jumpUser2) {
            clearInterval(jumpUser2);
            jumpUser2 = null;
        }
        if (!fallUser2 && y2 != jumpHighUser2 && wPressed == true) {
            fallUser2 = setInterval(fallUser2Function, 16);
        }
    }
}

function checkForCollisionFallUser2() {
    let floorTouched = false;
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y2 + 16 === normalPlatforms[i].y &&
            x2 + 2 >= normalPlatforms[i].x &&
            x2 <= normalPlatforms[i].x + normalPlatforms[i].width) {
            floorTouched = true;
            if (fallUser2) {
                clearInterval(fallUser2);
                fallUser2 = null;
            }
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y2 + 16 === specialPlatforms[i].y &&
            x2 + 2 >= specialPlatforms[i].x &&
            x2 <= specialPlatforms[i].x + specialPlatforms[i].width) {
            floorTouched = true;
            if (fallUser2) {
                clearInterval(fallUser2);
                fallUser2 = null;
            }
        }
    }

    if (y2 + 15 === floor[0].y && x2 + 2 >= floor[0].x && x2 <= floor[0].x + floor[0].width) {
        floorTouched = true;
        clearInterval(fallUser2);
        fallUser2 = null;
    }
    if (!floorTouched && !jumpUser2) {
        beforeJumpUser2 += 2;
    }
}

function checkForCollisionMoveUser2() {
    let floorTouched = false;
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y2 + 14 === normalPlatforms[i].y &&
            x2 + 2 >= normalPlatforms[i].x &&
            x2 <= normalPlatforms[i].x + normalPlatforms[i].width) {
            floorTouched = true;
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y2 + 14 === specialPlatforms[i].y &&
            x2 + 2 >= specialPlatforms[i].x &&
            x2 <= specialPlatforms[i].x + specialPlatforms[i].width) {
            floorTouched = true;
        }
    }
    if (y2 + 13 === floor[0].y && x2 + 2 >= floor[0].x && x2 <= floor[0].x + floor[0].width) {
        floorTouched = true;
    }

    if (!floorTouched && !jumpUser2 && !fallUser2) {
        fallUser2 = setInterval(fallUser2Function, 16);
        beforeJumpUser2 += 2;
    }
}

function checkForCollisionBokUser2() {
    let wallTouchedR = false;
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y2 + 2 <= normalPlatforms[i].y + (4 * normalPlatforms[i].height) &&
            y2 + 14 >= normalPlatforms[i].y &&
            x2 === normalPlatforms[i].x + normalPlatforms[i].width) {
            wallTouchedR = true;
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y2 + 2 <= specialPlatforms[i].y + (4 * specialPlatforms[i].height) &&
            y2 + 14 >= specialPlatforms[i].y &&
            x2 === specialPlatforms[i].x + specialPlatforms[i].width) {
            wallTouchedR = true;
        }
    }
    if (wallTouchedR && aPressed) {
        aPressed = false;
    }
    if (!wallTouchedR && pressLu2) {
        aPressed = true;
    }

    let wallTouchedL = false;
    for (let i = 0; i < normalPlatforms.length; i++) {
        if (y2 + 2 <= normalPlatforms[i].y + (4 * normalPlatforms[i].height) &&
            y2 + 14 >= normalPlatforms[i].y &&
            x2 + 2 === normalPlatforms[i].x) {
            wallTouchedL = true;
        }
    }
    for (let i = 0; i < specialPlatforms.length; i++) {
        if (y2 + 2 <= specialPlatforms[i].y + (4 * specialPlatforms[i].height) &&
            y2 + 14 >= specialPlatforms[i].y &&
            x2 + 2 === specialPlatforms[i].x) {
            wallTouchedL = true;
        }
    }
    if (wallTouchedL && dPressed) {
        dPressed = false;
    }
    if (!wallTouchedL && pressRu2) {
        dPressed = true;
    }
}

// właściwości gracza 1 strzelanie hp itp.
 

// sx1 i sy1 oznacza pozcyje strzalu pocisku czyli aktualna pozycja gracza i 6 jednsotek w dol
// psy1 i psx1 oznacza poczatek strzelu
// czyli psx1 i psy1 pobiera wartosc z aktualnego polozenia gracza
//  i sy1 i sx1 dodaje sie przemieszczajac pocisk (sy1 nic nie robi ale mozna go uzyc zebys strzelac do gory)
// shotuser1 to animacja poruszania sie pocisku
//  direction to kierunek w ktorym sie porusza

let user1HP = 25


let sy1 = 6
let sx1 = 0
let psy1
let psx1
let shotUser1
let direction
let directionShot
let lastShots1


let sy1s2 = 6
let sx1s2 = 0
let psy1s2
let psx1s2
let shotUser1s2
let directions2
let directionShots2
let lastShots2

let sy1s3 = 6
let sx1s3 = 0
let psy1s3
let psx1s3
let shotUser1s3
let directions3
let directionShots3
let lastShots3

let sy1s4 = 6
let sx1s4 = 0
let psy1s4
let psx1s4
let shotUser1s4
let directions4
let directionShots4
let lastShots4

let sy1s5 = 6
let sx1s5 = 0
let psy1s5
let psx1s5
let shotUser1s5
let directions5
let directionShots5
let lastShots5


let isShottingUser1 = true
let user1ShotArray = []


let shotimg = new Image()


function which(){
    if(directionShot == true && lastShots1 == 0){
        shotimg.src = 'img/kupaL.png'
    } else if (directionShot == false && lastShots1 == 0){
        shotimg.src = 'img/kupaP.png'
    } else if(directionShot == true && lastShots1 == 1){
        shotimg.src = 'img/kupaLS.png'
    } else if (directionShot == false && lastShots1 == 1){
        shotimg.src = 'img/kupaPS.png'
    }
}
function which2(){
    if(directionShots2 == true && lastShots2 == 0){
        shotimg.src = 'img/kupaL.png'
    } else if (directionShots2 == false && lastShots2 == 0){
        shotimg.src = 'img/kupaP.png'
    } else if(directionShots2 == true && lastShots2 == 1){
        shotimg.src = 'img/kupaLS.png'
    } else if (directionShots2 == false && lastShots2 == 1){
        shotimg.src = 'img/kupaPS.png'
    }
}
function which3(){
    if(directionShots3 == true && lastShots3 == 0){
        shotimg.src = 'img/kupaL.png'
    } else if (directionShots3 == false && lastShots3 == 0){
        shotimg.src = 'img/kupaP.png'
    } else if(directionShots3 == true && lastShots3 == 1){
        shotimg.src = 'img/kupaLS.png'
    } else if (directionShots3 == false && lastShots3 == 1){
        shotimg.src = 'img/kupaPS.png'
    }
}
function which4(){
    if(directionShots4 == true && lastShots4 == 0){
        shotimg.src = 'img/kupaL.png'
    } else if (directionShots4 == false && lastShots4 == 0){
        shotimg.src = 'img/kupaP.png'
    } else if(directionShots4 == true && lastShots4 == 1){
        shotimg.src = 'img/kupaLS.png'
    } else if (directionShots4 == false && lastShots4 == 1){
        shotimg.src = 'img/kupaPS.png'
    }
}
function which5(){
    if(directionShots5 == true && lastShots5 == 0){
        shotimg.src = 'img/kupaL.png'
    } else if (directionShots5 == false && lastShots5 == 0){
        shotimg.src = 'img/kupaP.png'
    } else if(directionShots5 == true && lastShots5 == 1){
        shotimg.src = 'img/kupaLS.png'
    } else if (directionShots5 == false && lastShots5 == 1){
        shotimg.src = 'img/kupaPS.png'
    }
}


const shotUser1Draw = () => {
    which()
    ctx.drawImage(shotimg, procentW() * (psx1 + sx1),(getHeight() - (getWidth() - (procentW() * (psy1 + sy1))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot2User1Draw = () => {
    which2()
    ctx.drawImage(shotimg, procentW() * (psx1s2 + sx1s2),(getHeight() - (getWidth() - (procentW() * (psy1s2 + sy1s2))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot3User1Draw = () => {
    which3()
    ctx.drawImage(shotimg, procentW() * (psx1s3 + sx1s3),(getHeight() - (getWidth() - (procentW() * (psy1s3 + sy1s3))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot4User1Draw = () => {
    which4()
    ctx.drawImage(shotimg, procentW() * (psx1s4 + sx1s4),(getHeight() - (getWidth() - (procentW() * (psy1s4 + sy1s4))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot5User1Draw = () => {
    which5()
    ctx.drawImage(shotimg, procentW() * (psx1s5 + sx1s5),(getHeight() - (getWidth() - (procentW() * (psy1s5 + sy1s5))) / 2)/2, procentW() * 3,procentW() * 2)
}

document.addEventListener('keydown', (e) =>{
    if(e.key == 'Enter'){
        if(isShottingUser1 && shotUser1s4 && !shotUser1s5 && user1ShotArray.length > 0){
            isShottingUser1 = false
            lastShots5 = user1ShotArray.pop()
            psy1s5 = y1
            psx1s5 = x1
            if(lastKeyL){
                sx1s5 += -1
                directions5 = -1
                directionShots5 = false
            }
            if(lastKeyR){
                directions5 = 1
                directionShots5 = true
            }
            shotUser1s5 = setInterval(() =>{
                shotCollisionUser1()
                sx1s5 += directions5
                if (psx1s5 + sx1s5 >= 87 || psx1s5 + sx1s5 <= 10){
                    clearInterval(shotUser1s5)
                    shotUser1s5 = null
                    sx1s5 = 0
                }
            }, 16)
        }
        if(isShottingUser1 && shotUser1s3 && !shotUser1s4 && user1ShotArray.length > 0){
            isShottingUser1 = false
            lastShots4 = user1ShotArray.pop()
            psy1s4 = y1
            psx1s4 = x1
            if(lastKeyL){
                sx1s4 += -1
                directions4 = -1
                directionShots4 = false
            }
            if(lastKeyR){
                directions4 = 1
                directionShots4 = true
            }
            shotUser1s4 = setInterval(() =>{
                shotCollisionUser1()
                sx1s4 += directions4
                if (psx1s4 + sx1s4 >= 87 || psx1s4 + sx1s4 <= 10){
                    clearInterval(shotUser1s4)
                    shotUser1s4 = null
                    sx1s4 = 0
                }
            }, 16)
        }
        if(isShottingUser1 && shotUser1s2 && !shotUser1s3 && user1ShotArray.length > 0){
            isShottingUser1 = false
            lastShots3 = user1ShotArray.pop()
            psy1s3 = y1
            psx1s3 = x1
            if(lastKeyL){
                sx1s3 += -1
                directions3 = -1
                directionShots3 = false
            }
            if(lastKeyR){
                directions3 = 1
                directionShots3 = true
            }
            shotUser1s3 = setInterval(() =>{
                shotCollisionUser1()
                sx1s3 += directions3
                if (psx1s3 + sx1s3 >= 87 || psx1s3 + sx1s3 <= 10){
                    clearInterval(shotUser1s3)
                    shotUser1s3 = null
                    sx1s3 = 0
                }
            }, 16)
        }
        if(isShottingUser1 && shotUser1 && !shotUser1s2 && user1ShotArray.length > 0){
            isShottingUser1 = false
            lastShots2 = user1ShotArray.pop()
            psy1s2 = y1
            psx1s2 = x1
            if(lastKeyL){
                sx1s2 += -1
                directions2 = -1
                directionShots2 = false
            }
            if(lastKeyR){
                directions2 = 1
                directionShots2 = true
            }
            shotUser1s2 = setInterval(() =>{
                shotCollisionUser1()
                sx1s2 += directions2
                if (psx1s2 + sx1s2 >= 87 || psx1s2 + sx1s2 <= 10){
                    clearInterval(shotUser1s2)
                    shotUser1s2 = null
                    sx1s2 = 0
                }
            }, 16)
        }
        if(isShottingUser1 && !shotUser1 && user1ShotArray.length > 0){
            isShottingUser1 = false
            lastShots1 = user1ShotArray.pop()
            psy1 = y1
            psx1 = x1
            if(lastKeyL){
                sx1 += -1
                direction = -1
                directionShot = false
            }
            if(lastKeyR){
                direction = 1
                directionShot = true
            }
            shotUser1 = setInterval(() =>{
                shotCollisionUser1()
                sx1 += direction
                if (psx1 + sx1 >= 87 || psx1 + sx1 <= 10){
                    clearInterval(shotUser1)
                    shotUser1 = null
                    sx1 = 0
                }
            }, 16)
        }
        isShottingUser1 = false
    }
})

document.addEventListener('keyup', (e) =>{
    if(e.key == 'Enter'){
        isShottingUser1 = true
    }
})

let user2HP = 25

let sy2 = 6
let sx2 = 0
let psy2
let psx2
let shotUser2
let direction2
let directionShotu2
let lastShotu2s1

let sy2s2 = 6
let sx2s2 = 0
let psy2s2
let psx2s2
let shotUser2s2
let direction2s2
let directionShotu2s2
let lastShotu2s2

let sy2s3 = 6
let sx2s3 = 0
let psy2s3
let psx2s3
let shotUser2s3
let direction2s3
let directionShotu2s3
let lastShotu2s3

let sy2s4 = 6
let sx2s4 = 0
let psy2s4
let psx2s4
let shotUser2s4
let direction2s4
let directionShotu2s4
let lastShotu2s4

let sy2s5 = 6
let sx2s5 = 0
let psy2s5
let psx2s5
let shotUser2s5
let direction2s5
let directionShotu2s5
let lastShotu2s5

let isShottingUser2 = true

let user2ShotArray = []

let shotimg2 = new Image()

function whichu2(){
    if(directionShotu2 == true && lastShotu2s1 == 0){
        shotimg2.src = 'img/kupaL.png'
    } else if (directionShotu2 == false && lastShotu2s1 == 0){
        shotimg2.src = 'img/kupaP.png'
    } else if(directionShotu2 == true && lastShotu2s1 == 1){
        shotimg2.src = 'img/kupaLS.png'
    } else if (directionShotu2 == false && lastShotu2s1 == 1){
        shotimg2.src = 'img/kupaPS.png'
    }
}
function which2u2(){
    if(directionShotu2s2 == true && lastShotu2s2 == 0){
        shotimg2.src = 'img/kupaL.png'
    } else if (directionShotu2s2 == false && lastShotu2s2 == 0){
        shotimg2.src = 'img/kupaP.png'
    } else if(directionShotu2s2 == true && lastShotu2s2 == 1){
        shotimg2.src = 'img/kupaLS.png'
    } else if (directionShotu2s2 == false && lastShotu2s2 == 1){
        shotimg2.src = 'img/kupaPS.png'
    }
}
function which3u2(){
    if(directionShotu2s3 == true && lastShotu2s3 == 0){
        shotimg2.src = 'img/kupaL.png'
    } else if (directionShotu2s3 == false && lastShotu2s3 == 0){
        shotimg2.src = 'img/kupaP.png'
    } else if(directionShotu2s3 == true && lastShotu2s3 == 1){
        shotimg2.src = 'img/kupaLS.png'
    } else if (directionShotu2s3 == false && lastShotu2s3 == 1){
        shotimg2.src = 'img/kupaPS.png'
    }
}
function which4u2(){
    if(directionShotu2s4 == true && lastShotu2s4 == 0){
        shotimg2.src = 'img/kupaL.png'
    } else if (directionShotu2s4 == false && lastShotu2s4 == 0){
        shotimg2.src = 'img/kupaP.png'
    } else if(directionShotu2s4 == true && lastShotu2s4 == 1){
        shotimg2.src = 'img/kupaLS.png'
    } else if (directionShotu2s4 == false && lastShotu2s4 == 1){
        shotimg2.src = 'img/kupaPS.png'
    }
}
function which5u2(){
    if(directionShotu2s5 == true && lastShotu2s5 == 0){
        shotimg2.src = 'img/kupaL.png'
    } else if (directionShotu2s5 == false && lastShotu2s5 == 0){
        shotimg2.src = 'img/kupaP.png'
    } else if(directionShotu2s5 == true && lastShotu2s5 == 1){
        shotimg2.src = 'img/kupaLS.png'
    } else if (directionShotu2s5 == false && lastShotu2s5 == 1){
        shotimg2.src = 'img/kupaPS.png'
    }
}

const shotUser2Draw = () => {
    whichu2()
    ctx.drawImage(shotimg2, procentW() * (psx2 + sx2),(getHeight() - (getWidth() - (procentW() * (psy2 + sy2))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot2User2Draw = () => {
    which2u2()
    ctx.drawImage(shotimg2, procentW() * (psx2s2 + sx2s2),(getHeight() - (getWidth() - (procentW() * (psy2s2 + sy2s2))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot3User2Draw = () => {
    which3u2()
    ctx.drawImage(shotimg2, procentW() * (psx2s3 + sx2s3),(getHeight() - (getWidth() - (procentW() * (psy2s3 + sy2s3))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot4User2Draw = () => {
    which4u2()
    ctx.drawImage(shotimg2, procentW() * (psx2s4 + sx2s4),(getHeight() - (getWidth() - (procentW() * (psy2s4 + sy2s4))) / 2)/2, procentW() * 3,procentW() * 2)
}
const shot5User2Draw = () => {
    which5u2()
    ctx.drawImage(shotimg2, procentW() * (psx2s5 + sx2s5),(getHeight() - (getWidth() - (procentW() * (psy2s5 + sy2s5))) / 2)/2, procentW() * 3,procentW() * 2)
}

document.addEventListener('keydown', (e) =>{
    if(e.key == 'g'){
        if(isShottingUser2 && shotUser2s4 && !shotUser2s5 && user2ShotArray.length > 0){
            lastShotu2s5 = user2ShotArray.pop()
            psy2s5 = y2
            psx2s5 = x2
            if(lastKeyLu2){
                sx2s5 += -1
                direction2s5 = -1
                directionShotu2s5 = false
            }
            if(lastKeyRu2){
                direction2s5 = 1
                directionShotu2s5 = true
            }
            shotUser2s5 = setInterval(() =>{
                shotCollisionUser2()
                sx2s5 += direction2s5
                if (psx2s5 + sx2s5 >= 87 || psx2s5 + sx2s5 <= 10){
                    clearInterval(shotUser2s5)
                    shotUser2s5 = null
                    sx2s5 = 0
                }
            }, 16)
        }
        if(isShottingUser2 && shotUser2s3 && !shotUser2s4 && user2ShotArray.length > 0){
            lastShotu2s4 = user2ShotArray.pop()
            psy2s4 = y2
            psx2s4 = x2
            if(lastKeyLu2){
                sx2s4 += -1
                direction2s4 = -1
                directionShotu2s4 = false
            }
            if(lastKeyRu2){
                direction2s4 = 1
                directionShotu2s4 = true
            }
            shotUser2s4 = setInterval(() =>{
                shotCollisionUser2()
                sx2s4 += direction2s4
                if (psx2s4 + sx2s4 >= 87 || psx2s4 + sx2s4 <= 10){
                    clearInterval(shotUser2s4)
                    shotUser2s4 = null
                    sx2s4 = 0
                }
            }, 16)
        }
        if(isShottingUser2 && shotUser2s2 && !shotUser2s3 && user2ShotArray.length > 0){
            lastShotu2s3 = user2ShotArray.pop()
            psy2s3 = y2
            psx2s3 = x2
            if(lastKeyLu2){
                sx2s3 += -1
                direction2s3 = -1
                directionShotu2s3 = false
            }
            if(lastKeyRu2){
                direction2s3 = 1
                directionShotu2s3 = true
            }
            shotUser2s3 = setInterval(() =>{
                shotCollisionUser2()
                sx2s3 += direction2s3
                if (psx2s3 + sx2s3 >= 87 || psx2s3 + sx2s3 <= 10){
                    clearInterval(shotUser2s3)
                    shotUser2s3 = null
                    sx2s3 = 0
                }
            }, 16)
        }
        if(isShottingUser2 && shotUser2 && !shotUser2s2 && user2ShotArray.length > 0){
            lastShotu2s2 = user2ShotArray.pop()
            psy2s2 = y2
            psx2s2 = x2
            if(lastKeyLu2){
                sx2s2 += -1
                direction2s2 = -1
                directionShotu2s2 = false
            }
            if(lastKeyRu2){
                direction2s2 = 1
                directionShotu2s2 = true
            }
            shotUser2s2 = setInterval(() =>{
                shotCollisionUser2()
                sx2s2 += direction2s2
                if (psx2s2 + sx2s2 >= 87 || psx2s2 + sx2s2 <= 10){
                    clearInterval(shotUser2s2)
                    shotUser2s2 = null
                    sx2s2 = 0
                }
            }, 16)
        }
        if(isShottingUser2 && !shotUser2 && user2ShotArray.length > 0){
            lastShotu2s1 = user2ShotArray.pop()
            psy2 = y2
            psx2 = x2
            if(lastKeyLu2){
                sx2 += -1
                direction2 = -1
                directionShotu2 = false
            }
            if(lastKeyRu2){
                direction2 = 1
                directionShotu2 = true
            }
            shotUser2 = setInterval(() =>{
                shotCollisionUser2()
                sx2 += direction2
                if (psx2 + sx2 >= 87 || psx2 + sx2 <= 10){
                    clearInterval(shotUser2)
                    shotUser2 = null
                    sx2 = 0
                }
            }, 16)
        }
        isShottingUser2 = false
    }
})


document.addEventListener('keyup', (e) =>{
    if(e.key == 'g'){
        isShottingUser2 = true
    }
})

// hp graficznie

function hpDisplayUser1() {
    ctx.fillStyle = 'lightblue'
    ctx.fillRect(procentW() * 10 ,(getHeight() - (getWidth() - (procentW() * 180)) / 2)/2, procentW() * 40, procentW() * 6)

    ctx.font = `${procentW() * 1.5}px Arial Black`;
    ctx.fillStyle = 'black'
    ctx.fillText(`HP Player1: ${user1HP * 4}%`, procentW() * 12 ,(getHeight() - (getWidth() - (procentW() * 187)) / 2)/2, procentW() * 50,procentW() * 20);

    ctx.fillStyle = 'green'
    ctx.fillRect(procentW() * 12 ,(getHeight() - (getWidth() - (procentW() * 190)) / 2)/2, procentW() * (user1HP * 1.4), procentW() * 2)

}

function hpDisplayUser2() {
    ctx.fillStyle = 'coral'
    ctx.fillRect(procentW() * 50 ,(getHeight() - (getWidth() - (procentW() * 180)) / 2)/2, procentW() * 40, procentW() * 6)

    ctx.font = `${procentW() * 1.5}px Arial Black`;
    ctx.fillStyle = 'black'
    ctx.fillText(`HP Player2: ${user2HP * 4}%`, procentW() * 52 ,(getHeight() - (getWidth() - (procentW() * 187)) / 2)/2, procentW() * 50,procentW() * 20);

    ctx.fillStyle = 'green'
    ctx.fillRect(procentW() * 52 ,(getHeight() - (getWidth() - (procentW() * 190)) / 2)/2, procentW() * (user2HP * 1.4), procentW() * 2)
}

// shot collision


function shotCollisionUser1(){
    if(((x2 <= (psx1 + (sx1 + 3))) && ((x2 + 2) >= psx1 + sx1)) &&
    ((y2 <= (psy1 + sy1 + 8)) && (y2 + 16 >= (psy1 + sy1))) && user2HP > 0 && shotUser1){
        if(lastShots1 == 0){
            user2HP--
        } else if (lastShots1 == 1){
            user2HP --
            setTimeout(()=>{
                user2HP--
            },1000)
            setTimeout(()=>{
                user2HP--
            },2000)
        }
        clearInterval(shotUser1)
        shotUser1 = null
        sx1 = 0
    }
    if(((x2 <= (psx1s2 + (sx1s2 + 3))) && ((x2 + 2) >= psx1s2 + sx1s2)) &&
    ((y2 <= (psy1s2 + sy1s2 + 8)) && (y2 + 16 >= (psy1s2 + sy1s2))) && user2HP > 0 && shotUser1s2){
        if(lastShots2 == 0){
            user2HP--
        } else if (lastShots2 == 1){
            user2HP --
            setTimeout(()=>{
                user2HP--
            },1000)
            setTimeout(()=>{
                user2HP--
            },2000)
        }
        clearInterval(shotUser1s2)
        shotUser1s2 = null
        sx1s2 = 0
    }
    if(((x2 <= (psx1s3 + (sx1s3 + 3))) && ((x2 + 2) >= psx1s3 + sx1s3)) &&
    ((y2 <= (psy1s3 + sy1s3 + 8)) && (y2 + 16 >= (psy1s3 + sy1s3))) && user2HP > 0 && shotUser1s3){
        if(lastShots3 == 0){
            user2HP--
        } else if (lastShots3 == 1){
            user2HP --
            setTimeout(()=>{
                user2HP--
            },1000)
            setTimeout(()=>{
                user2HP--
            },2000)
        }
        clearInterval(shotUser1s3)
        shotUser1s3 = null
        sx1s3 = 0
    }
    if(((x2 <= (psx1s4 + (sx1s4 + 3))) && ((x2 + 2) >= psx1s4 + sx1s4)) &&
    ((y2 <= (psy1s4 + sy1s4 + 8)) && (y2 + 16 >= (psy1s4 + sy1s4))) && user2HP > 0 && shotUser1s4){
        if(lastShots4 == 0){
            user2HP--
        } else if (lastShots4 == 1){
            user2HP --
            setTimeout(()=>{
                user2HP--
            },1000)
            setTimeout(()=>{
                user2HP--
            },2000)
        }
        clearInterval(shotUser1s4)
        shotUser1s4 = null
        sx1s4 = 0
    }
    if(((x2 <= (psx1s5 + (sx1s5 + 3))) && ((x2 + 2) >= psx1s5 + sx1s5)) &&
    ((y2 <= (psy1s5 + sy1s5 + 8)) && (y2 + 16 >= (psy1s5 + sy1s5))) && user2HP > 0 && shotUser1s5){
        if(lastShots5 == 0){
            user2HP--
        } else if (lastShots5 == 1){
            user2HP --
            setTimeout(()=>{
                user2HP--
            },1000)
            setTimeout(()=>{
                user2HP--
            },2000)
        }
        clearInterval(shotUser1s5)
        shotUser1s5 = null
        sx1s5 = 0
    }
}

function shotCollisionUser2(){
    if(((x1 <= (psx2 + (sx2 + 3))) && ((x1 + 2) >= psx2 + sx2)) &&
    ((y1 <= (psy2 + sy2 + 8)) && (y1 + 16 >= (psy2 + sy2))) && user1HP > 0 && shotUser2){
        if(lastShotu2s1 == 0){
            user1HP--
        } else if (lastShotu2s1 == 1){
            user1HP --
            setTimeout(()=>{
                user1HP--
            },1000)
            setTimeout(()=>{
                user1HP--
            },2000)
        }
        clearInterval(shotUser2)
        shotUser2 = null
        sx2 = 0
    }
    if(((x1 <= (psx2s2 + (sx2s2 + 3))) && ((x1 + 2) >= psx2s2 + sx2s2)) &&
    ((y1 <= (psy2s2 + sy2s2 + 8)) && (y1 + 16 >= (psy2s2 + sy2s2))) && user1HP > 0 && shotUser2s2){
        if(lastShotu2s2 == 0){
            user1HP--
        } else if (lastShotu2s2 == 1){
            user1HP --
            setTimeout(()=>{
                user1HP--
            },1000)
            setTimeout(()=>{
                user1HP--
            },2000)
        }
        clearInterval(shotUser2s2)
        shotUser2s2 = null
        sx2s2 = 0
    }
    if(((x1 <= (psx2s3 + (sx2s3 + 3))) && ((x1 + 2) >= psx2s3 + sx2s3)) &&
    ((y1 <= (psy2s3 + sy2s3 + 8)) && (y1 + 16 >= (psy2s3 + sy2s3))) && user1HP > 0 && shotUser2s3){
        if(lastShotu2s3 == 0){
            user1HP--
        } else if (lastShotu2s3 == 1){
            user1HP --
            setTimeout(()=>{
                user1HP--
            },1000)
            setTimeout(()=>{
                user1HP--
            },2000)
        }
        clearInterval(shotUser2s3)
        shotUser2s3 = null
        sx2s3 = 0
    }
    if(((x1 <= (psx2s4 + (sx2s4 + 3))) && ((x1 + 2) >= psx2s4 + sx2s4)) &&
    ((y1 <= (psy2s4 + sy2s4 + 8)) && (y1 + 16 >= (psy2s4 + sy2s4))) && user1HP > 0 && shotUser2s4){
        if(lastShotu2s4 == 0){
            user1HP--
        } else if (lastShotu2s4 == 1){
            user1HP --
            setTimeout(()=>{
                user1HP--
            },1000)
            setTimeout(()=>{
                user1HP--
            },2000)
        }
        clearInterval(shotUser2s4)
        shotUser2s4 = null
        sx2s4 = 0
    }
    if(((x1 <= (psx2s5 + (sx2s5 + 3))) && ((x1 + 2) >= psx2s5 + sx2s5)) &&
    ((y1 <= (psy2s5 + sy2s5 + 8)) && (y1 + 16 >= (psy2s5 + sy2s5))) && user1HP > 0 && shotUser2s5){
        if(lastShotu2s5 == 0){
            user1HP--
        } else if (lastShotu2s5 == 1){
            user1HP --
            setTimeout(()=>{
                user1HP--
            },1000)
            setTimeout(()=>{
                user1HP--
            },2000)
        }
        clearInterval(shotUser2s5)
        shotUser2s5 = null
        sx2s5 = 0
    }
}

// tworzenie jedzonka
let brokulimg = new Image()
brokulimg.src = 'img/brokul.png'

let kebabimg = new Image()
kebabimg.src = 'img/kebab.png'

let marchewkaimg = new Image()
marchewkaimg.src = 'img/marchewka.png'

let chipsyimg = new Image()
chipsyimg.src = 'img/chipsy.png'

let chiliimg = new Image()
chiliimg.src = 'img/chili.png'

let pomidorimg = new Image()
pomidorimg.src = 'img/pomidor.png'

let hamburgerimg = new Image()
hamburgerimg.src = 'img/hamburger.png'

function brokul(fx ,fy) {
    ctx.drawImage(brokulimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}
function kebab(fx, fy) {
    ctx.drawImage(kebabimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}
function marchewka(fx, fy) {
    ctx.drawImage(marchewkaimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}
function chipsy(fx, fy) {
    ctx.drawImage(chipsyimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}
function chili(fx, fy) {
    ctx.drawImage(chiliimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}
function pomidor(fx, fy) {
    ctx.drawImage(pomidorimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}
function hamburger(fx, fy) {
    ctx.drawImage(hamburgerimg, procentW() * (fx - 1.5),(getHeight() - (getWidth() - (procentW() * (fy))) / 2)/2, procentW() * 3,procentW() * 3)
}

const foods = [
    kebab,
    chipsy,
    hamburger,
    brokul,
    marchewka,
    chili,
    pomidor,
    brokul,
    marchewka,
    chili,
    pomidor,
    brokul,
    marchewka,
    chili,
    pomidor,
]


let f1x
let f1y

let f2x
let f2y

let f3x
let f3y

let f1 = false
let f2 = false
let f3 = false

let random1
let random2
let random3

function createFood() {
    foods.sort(() => 0.5 - Math.random())
        for(let i = 0; i < specialPlatforms.length; i++){
        if(i == 0){
            f1x = specialPlatforms[i].x + specialPlatforms[i].width/2
            f1y = specialPlatforms[i].y - 15
            f1 = true
        }

        if(i == 1){
            f2x = specialPlatforms[i].x + specialPlatforms[i].width/2
            f2y = specialPlatforms[i].y - 15
            f2 = true
        }

        if(i == 2){
            f3x = specialPlatforms[i].x + specialPlatforms[i].width/2
            f3y = specialPlatforms[i].y - 15
            f3 = true
        }

        random1 = Math.floor(Math.random() * foods.length)
        random2 = Math.floor(Math.random() * foods.length)
        random3 = Math.floor(Math.random() * foods.length)
    }
    foodCollisionUser1()
    foodCollisionUser2()
}
createFood()
setInterval(createFood, 5000)

let nabojZ = new Image()
nabojZ.src = 'img/nabojZ.png'

let nabojS = new Image()
nabojS.src = 'img/nabojS.png'

function drawAmunition(naboj, userx, usery, x){
    ctx.drawImage(naboj, procentW() * (userx + x),(getHeight() - (getWidth() - (procentW() * (usery - 10))) / 2)/2, procentW() * 0.6,procentW() * 1.5)
}
// amunition display
function amunitionDIsplay() {
    if(user1ShotArray[0] == 0){
        drawAmunition(nabojZ, x1, y1, -1.4)
    } else if (user1ShotArray[0] == 1){
        drawAmunition(nabojS, x1, y1, -1.4)
    }
    if(user1ShotArray[1] == 0){
        drawAmunition(nabojZ, x1, y1, -0.4)
    } else if (user1ShotArray[1] == 1){
        drawAmunition(nabojS, x1, y1, -0.4)
    }
    if(user1ShotArray[2] == 0){
        drawAmunition(nabojZ, x1, y1, 0.6)
    } else if (user1ShotArray[2] == 1){
        drawAmunition(nabojS, x1, y1, 0.6)
    }
    if(user1ShotArray[3] == 0){
        drawAmunition(nabojZ, x1, y1, 1.6)
    } else if (user1ShotArray[3] == 1){
        drawAmunition(nabojS, x1, y1, 1.6)
    }
    if(user1ShotArray[4] == 0){
        drawAmunition(nabojZ, x1, y1, 2.6)
    } else if (user1ShotArray[4] == 1){
        drawAmunition(nabojS, x1, y1, 2.6)
    }
    if(user2ShotArray[0] == 0){
        drawAmunition(nabojZ, x2, y2, -1.4)
    } else if (user2ShotArray[0] == 1){
        drawAmunition(nabojS, x2, y2, -1.4)
    }
    if(user2ShotArray[1] == 0){
        drawAmunition(nabojZ, x2, y2, -0.4)
    } else if (user2ShotArray[1] == 1){
        drawAmunition(nabojS, x2, y2, -0.4)
    }
    if(user2ShotArray[2] == 0){
        drawAmunition(nabojZ, x2, y2, 0.6)
    } else if (user2ShotArray[2] == 1){
        drawAmunition(nabojS, x2, y2, 0.6)
    }
    if(user2ShotArray[3] == 0){
        drawAmunition(nabojZ, x2, y2, 1.6)
    } else if (user2ShotArray[3] == 1){
        drawAmunition(nabojS, x2, y2, 1.6)
    }
    if(user2ShotArray[4] == 0){
        drawAmunition(nabojZ, x2, y2, 2.6)
    } else if (user2ShotArray[4] == 1){
        drawAmunition(nabojS, x2, y2, 2.6)
    }
}

function collisionFood1(fx, fy, x, y){
    if(((x - 1 <= (fx)) && ((x + 3) >= fx)) &&
    ((y + 16 >= fy) && (y <= (fy + 8)))){
        
        if(f1 && (foods[random1] == kebab || foods[random1] == hamburger || foods[random1] == chipsy)){
            user1ShotArray.unshift(1,1,1)
        } else if(f1){
            user1ShotArray.unshift(0,0,0)
        }


        if(fx == f1x){
            f1 = false
        }
    }
}

function collisionFood2(fx, fy, x, y){
    if(((x - 1 <= (fx)) && ((x + 3) >= fx)) &&
    ((y + 16 >= fy) && (y <= (fy + 8)))){
        
        if(f2 && (foods[random2] == kebab || foods[random2] == hamburger || foods[random2] == chipsy)){
            user1ShotArray.unshift(1,1,1)
        } else if(f2){
            user1ShotArray.unshift(0,0,0)
        }


        if(fx == f2x){
            f2 = false
        }
    }
}

function collisionFood3(fx, fy, x, y){
    if(((x - 1 <= (fx)) && ((x + 3) >= fx)) &&
    ((y + 16 >= fy) && (y <= (fy + 8)))){

        if(f3 && (foods[random3] == kebab || foods[random3] == hamburger || foods[random3] == chipsy)){
            user1ShotArray.unshift(1,1,1)
        } else if(f3){
            user1ShotArray.unshift(0,0,0)
        }


        if(fx == f3x){
            f3 = false
        }
    }
}

function foodCollisionUser1(){
    collisionFood1(f1x, f1y, x1, y1)
    collisionFood2(f2x, f2y, x1, y1)
    collisionFood3(f3x, f3y, x1, y1)
}

function collisionFood1u2(fx, fy, x, y){
    if(((x - 1 <= (fx)) && ((x + 3) >= fx)) &&
    ((y + 16 >= fy) && (y <= (fy + 8)))){
        
        if(f1 && (foods[random1] == kebab || foods[random1] == hamburger || foods[random1] == chipsy)){
            user2ShotArray.unshift(1,1,1)
        } else if(f1){
            user2ShotArray.unshift(0,0,0)
        }


        if(fx == f1x){
            f1 = false
        }
    }
}

function collisionFood2u2(fx, fy, x, y){
    if(((x - 1 <= (fx)) && ((x + 3) >= fx)) &&
    ((y + 16 >= fy) && (y <= (fy + 8)))){
        
        if(f2 && (foods[random2] == kebab || foods[random2] == hamburger || foods[random2] == chipsy)){
            user2ShotArray.unshift(1,1,1)
        } else if(f2){
            user2ShotArray.unshift(0,0,0)
        }


        if(fx == f2x){
            f2 = false
        }
    }
}

function collisionFood3u2(fx, fy, x, y){
    if(((x - 1 <= (fx)) && ((x + 3) >= fx)) &&
    ((y + 16 >= fy) && (y <= (fy + 8)))){

        if(f3 && (foods[random3] == kebab || foods[random3] == hamburger || foods[random3] == chipsy)){
            user2ShotArray.unshift(1,1,1)
        } else if(f3){
            user2ShotArray.unshift(0,0,0)
        }


        if(fx == f3x){
            f3 = false
        }
    }
}

function foodCollisionUser2(){
    collisionFood1u2(f1x, f1y, x2, y2)
    collisionFood2u2(f2x, f2y, x2, y2)
    collisionFood3u2(f3x, f3y, x2, y2)
}


function drawAll() {
    display();
    hpDisplayUser1()
    hpDisplayUser2()
    normalPlatforms.forEach((platform) => {
        createNormalPlatform(platform.x, platform.y, platform.width, platform.height)
    })
    specialPlatforms.forEach((platform) => {
        createSpecialPlatform(platform.x, platform.y, platform.width, platform.height)
    })
    floor.forEach((platform) => {
        createFloor(platform.x, platform.y, platform.width, platform.height)
    })
    user1Draw();
    user2Draw();
    if(shotUser1){
        shotUser1Draw()
    }
    if(shotUser1s2){
        shot2User1Draw()
    }
    if(shotUser1s3){
        shot3User1Draw()
    }
    if(shotUser1s4){
        shot4User1Draw()
    }
    if(shotUser1s5){
        shot5User1Draw()
    }
    if(shotUser2){
        shotUser2Draw()
    }
    if(shotUser2s2){
        shot2User2Draw()
    }
    if(shotUser2s3){
        shot3User2Draw()
    }
    if(shotUser2s4){
        shot4User2Draw()
    }
    if(shotUser2s5){
        shot5User2Draw()
    }

    if(f1){
        foods[random1](f1x, f1y)
    }
    if(f2){
        foods[random2](f2x, f2y)
    }
    if(f3){
        foods[random3](f3x, f3y)
    }
    amunitionDIsplay()
    if(user1ShotArray.length > 5){
        user1ShotArray.pop()
    }
    if(user2ShotArray.length > 5){
        user2ShotArray.pop()
    }
    if(user1HP < 0){
        user1HP++
    }
    if(user2HP < 0){
        user2HP++
    }
}

// responsywnosc na bierząco wszystko tu wsadzic
window.addEventListener('resize', () => {
    getHeight()
    getWidth()
    canvasSize()
    drawAll()
})

// pojawienie sie tla przy zaladowaniu strony bo bez tego nie dziala
tlo.onload = () => {
    getHeight()
    getWidth()
    canvasSize();
    drawAll()
}