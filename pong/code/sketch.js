// Mikian Musser
// https://p5js.org/reference/

let x = 100;
let y = 100;
let z = 20;
let xSpeed = 4;
let ySpeed = 5;

let px = 100;
let py;

function setup(){
  createCanvas(500,500);
  py = height - 100;
}

function draw(){
  background(100);
  fill(200,62,200)
  ellipse(x,y,z)
  x = x + xSpeed;
  y = y + ySpeed;
  if(x < 0){
  	xSpeed = xSpeed * -1;
  }
  if(x > width){
  	xSpeed = xSpeed * -1;
  }

  if(y < 0){
  	ySpeed = ySpeed * -1;
  }
  if(y > height){
  	ySpeed = ySpeed * -1;
  }

  rect(px, py, 200, 10)

  if(keyIsDown(LEFT_ARROW)){
  	px = px - 10;
  }
  if(keyIsDown(RIGHT_ARROW)){
  	px = px + 10;
  }

  if(collideRectCircle(px,py,200,10,x,y,z,z)){
  		ySpeed = ySpeed * -1;
  }
}
 