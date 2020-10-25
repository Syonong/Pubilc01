'use strict'
var ctx, vcanvas;
var head = {
    x: 100,
    y: 100,
    wh: 20,
    d: 0 // 각도
};
var food = {
    x: 300,
    y: 300, 
    wh: 5
};
var r_left, r_right, r_up, r_down;
var speed = 8;
var tail = [];

function update(){
    if (head.d > 360){
        head.d = head.d - 360;
    }
    if (head.d < 0){
        head.d = head.d + 360;
    }
    var degree = head.d / 180 * Math.PI;
    
    // 꼬리의 위치가 바뀜
    for(var i = tail.length - 1; i > 0; i--){
        tail[i] = tail[i-1];
    }
    tail[0] = {x: head.x, y: head.y}
    
    if (r_right === 1) {
        head.d += 10;
        head.x += speed * Math.cos(degree);
        head.y += speed * Math.sin(degree);
    }
    if (r_left === 1) {
        head.d -= 10;
        head.x += speed * Math.cos(degree);
        head.y += speed * Math.sin(degree);
    }
    if (r_left === 0 && r_right === 0){
        head.x += speed * Math.cos(degree);
        head.y += speed * Math.sin(degree);
    }
    /**
    if (r_up === 1) {
        head.y -= speed;
    }
    if (r_down === 1) {
        head.y += speed;
    }**/
}

function eat(pos){
    var dx = head.x - pos.x;
    var dy = head.y - pos.y;
    var d;
    ctx.beginPath();
    d = Math.sqrt(dx * dx + dy * dy);
    if (d < head.wh + food.wh){
        //꼬리를 증가시킴
        tail.push({x: null, y: null})
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
    ctx.beginPath();
    ctx.fillStyle = "blue";
    //ctx.fillRect(head.x, head.y, head.wh, head.wh);
    ctx.arc(0, 0, head.wh, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // head
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(5, -7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, 7, 3, 0, Math.PI * 2);
    ctx.fill();
}

function draw(){
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(head.d / 180 * Math.PI);
    drawHead();
    ctx.restore();
}

function drawtail(){
    // 꼬리 그리기
    //ctx.fillStyle = "skyblue";
    for(var i = 0; i < tail.length - 1; i++){
        //ctx.fillRect(tail[i].x, tail[i].y, head.wh, head.wh);
        ctx.fillStyle = 'rgb(&{255 - i * 30}, 0, 0)';
        ctx.beginPath();
        ctx.arc(tail[i].x, tail[i].y, head.wh, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.beginPath();
    //ctx.fillRect(food.x, food.y, food.wh, food.wh);
    ctx.arc(food.x, food.y, food.wh, 0, Math.PI * 2);
    ctx.fill();
}
/**
function collider(){
    // 벽충돌시 멈추는 판정
    if (head.x < 0 ) {
        head.x = 0;
    }
    if(head.x + head.wh > vcanvas.width){
        head.x = vcanvas.width - head.wh;
    }
    if (head.y < 0){
        head.y = 0;
    }
    if (head.y + head.wh > vcanvas.height){
        head.y = vcanvas.height - head.wh;
    }
}
**/
function gameLoop(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    update();
    if(eat(food) === true){
        newLocation();
    };
    //collider();
    drawFood();
    drawtail();
    draw();
}

function init(){
    vcanvas = document.getElementById("myCanvas")
    ctx = vcanvas.getContext("2d")
    
    //ctx.fillStyle = "black";
    //ctx.fillRect(head.x, head.y, head.wh, head.wh);
    //ctx.fill();
    
    setInterval(gameLoop, 50);
}

function set_key(){
    r_left = r_right = r_up = r_down = 0;
    
    if (event.keyCode===37){r_left = 1;}
    if (event.keyCode===38){r_up = 1;}
    if (event.keyCode===39){r_right = 1;}
    if (event.keyCode===40){r_down = 1;}
}
function stop_key(){
    if (event.keyCode===37){r_left = 0;}
    if (event.keyCode===38){r_up = 0;}
    if (event.keyCode===39){r_right = 0;}
    if (event.keyCode===40){r_down = 0;}
}
document.onkeydown = set_key;
document.onkeyup = stop_key;

// git add .
// git commit -m "messge"
// git puhs origin master