//-Di Vaughnn Scherer

function Drop(){
	this.x = random(0,width);
	this.y = random(0,height);
	this.color = color(random(0,255),random(0,255),random(0,255));
	// this.color = color(random(0,255),random(0,255),226);
	// this.color = color(random(0,255),43,226);
	// this.color = color(138,43,226);
	this.length = random(5,15);
	this.width = random(1,3);
	this.speed = random(5,15);

	this.show = function() {
		let temp = map(this.y,0,height,0,255)
		// let temp2 = map(this.x,0,width,0,255)
		colorMode(HSB)
		stroke(temp,100,100)
		// stroke(temp,0,temp2)
		// stroke(this.color)
		strokeWeight(this.width)
		line(this.x,this.y,this.x,this.y + this.length)
	}
	this.fall = function() {
		this.y = this.y + this.speed;
	}
	this.teleport = function() {
		if(this.y > height) {
			this.y = 0;
			this.x = random(0,width);
			this.speed = random(5,15);
		}
	}
}

let r = 225;
let rain = [];

let x;
let y;
let z = 20;
let xSpeed = 4;
let ySpeed = 5;

let px = 100;
let py;

function setup(){
	createCanvas(500,500)
	x = width/2;
	y = height/2;
	for(var i = 0; i < r; i++){
		rain[i] = new Drop();
	}
	py = height - 100;
}

function draw(){
	colorMode(RGB)
	background (230,230,250)
	for(var i = 0; i < r; i++){
		rain[i].show();
		rain[i].fall();
		rain[i].teleport();	
	}
	let temp = dist(x,y,width/2,height/2)
	let temp2 = dist(0,0,width/2,height/2)
	temp = map(temp,0,temp2,0,255)
	colorMode(HSB)
	fill(temp,100,100)
	colorMode(RGB)
	stroke(50,229,59)
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

  fill(0,255,255)
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