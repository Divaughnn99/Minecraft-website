//variables
const GRAVITY = 0.70;

const BLADE_SIZE = 10;
const BLADE_LENGTH = 150;

var sword;
var fruit = [];

var score;
var lives;

const BAD_FRUIT_PROBABILITY = 0.5;


// ========================================================
// no more variables
// ========================================================
function setup() {
    createCanvas(1200, 700);

    sword = new Blade(color("#ff0000")); // change sword color
    frameRate(40); //60 FPS

    lives = 1;
    score = 0; //initial
}

function draw() {
    background("#ff00ff"); //background color of map

    handleMouse();
    score += handleFruit();

    drawScore();
    drawLives();
}

/**
 * swing and slice
 */
function handleMouse() {

	if (mouseIsPressed) { // swing
		sword.swing(mouseX, mouseY);
	}

  if (frameCount % 2 === 0) { // update in half the time

		sword.update();
	}

  sword.draw(); // draws the sword animation
}

/*
    send and update fruit
    returns points earned
*/
function handleFruit() {

// Send out new fruit
  if (frameCount % 10 === 0) {

		if (noise(frameCount) > 0.65) { //decides how many times to send a fruit

			fruit.push(randomFruit()); //pushes the fruit into the map
		}
	}
// fruit cutting
	var points = 0;
	for (var i = fruit.length - 1; i >= 0; i--) {

		fruit[i].update();
		fruit[i].draw();

		if (!fruit[i].visible) { // if fruit is no longer on the screen

			if (!fruit[i].sliced && !fruit[i].bad) { // if fruit isn't bad and it isnt sliced
				lives--; //decrease lives by one
			}
			if (lives < 1) { // if lives are less than 1

				endGame(); // end the game
			}

			fruit.splice(i, 1); // remove the invisible fruit from array
		} else {

			points += (sword.checkForSlice(fruit[i])) ? 5 : 0; // if fruit is cut, add 5
		}

	}

	return points; // show the points
}

// Draw lives top right
function drawLives() {

  stroke(255);
  strokeWeight(3);
  fill("#FF00EE");

  for (var i = lives; i > 0; i--) {
		ellipse(width - (i * 20 + 20), 50, 20);
  }

}

//Draw points top left
function drawScore() {
  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 10, 50);
}

//End cycle and write end message
function endGame() {

  noLoop();

  textAlign(CENTER);
  noStroke();
  fill("#3d7028");
  textSize(100);
  text("you have failed this city!", width / 2, height / 2);
  fill("#cc0000")
  textSize(50);
  text("refresh to restart!", width / 2, height / 2 + 60);
}
