'use strict'
var ctx, vcanvas;
var head = {
    x: null,
    y: null,
    wh: 20
};
var food = {
    x: 300,
    y: 300, 
    wh: 20
};
var r_left, r_right, r_up, r_down;
var speed = 20;

function update(){
    if (r_right === 1){head.x += speed;}
    if (r_left === 1){head.x -= speed;}
    if (r_up === 1){head.y -= speed;}
    if (r_down === 1){head.y += speed;}
}

function eat(pos){
    var dx = head.x - pos.x;
    var dy = head.y - pos.y;
    var d;
    
    d = Math.sqrt(dx * dx + dy * dy);
    if (d < 1){
        return true;
    }
    else{
        return false;
    }
}

function newLocation(){
    food.x = Math.floor(Math.random() * vcanvas.width / speed) * speed;
    food.y = Math.floor(Math.random() * vcanvas.height / speed) * speed;
}

function drawHead(){
    ctx.fillStyle = "black";
    ctx.fillRect(head.x, head.y, head.wh, head.wh);
    ctx.fill();
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, food.wh, food.wh);
    ctx.fill();
}

function gameLoop(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    update();
    if(eat(food) === true){
        newLocation();
    };
    drawHead();
    drawFood();
}

function init(){
    vcanvas = document.getElementById("myCanvas")
    ctx = vcanvas.getContext("2d")
    
    //ctx.fillStyle = "black";
    //ctx.fillRect(head.x, head.y, head.wh, head.wh);
    //ctx.fill();
    
    setInterval(gameLoop, 100);
}

function set_key(){
    r_left = r_right = r_up = r_down = 0;
    
    if (event.keyCode===37){r_left = 1;}
    if (event.keyCode===38){r_up = 1;}
    if (event.keyCode===39){r_right = 1;}
    if (event.keyCode===40){r_down = 1;}
};
document.onkeydown = set_key;