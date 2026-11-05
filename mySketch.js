//loading bar animation variables
let progress = 0;
let barLength = 800;
let barPartWidth = 14;

//snow animation variables
let particles = [];

// drumstick animation variables
let frameCountHold = 0;
let holdTime = 30; 
let stickState = 0; 

function setup() {
	createCanvas(displayWidth, displayHeight);
}

function draw() {
	background(0, 181, 226);

	// emitter for snow
	for (let i = 0; i < 3; i++) {
		fill("white");
		particles.push(new Particle(random(width), 0));
	}

	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();

		if (particles[i].finished()) {
			particles.splice(i, 1);
		}
	}

	//draws drum
	drawDrum(width / 2, height / 4 * 3);

	//draws drumsticks
	drawSticks();

	// loading bar background
	fill("black");
	stroke(220);
	rect(width / 2, height / 4, barLength, 25);

	// loading bar animation
	let loadSpeed = int(random(10, 20));
	
	rectMode(CORNER);
	noStroke();
	if (progress < barLength && frameCount % loadSpeed === 0) {
		progress += barPartWidth/2;
	}

	for (let x = 0; x < progress - barPartWidth; x += barPartWidth) {
		if ((x / barPartWidth) % 2 === 0) {
			fill(180, 0, 20); 
		} else {
			fill("white");
		}
		rect(width / 2 - barLength / 2 + x + 1, height / 4 - 11, barPartWidth, 22);
	}
}

//fullscreen
function mousePressed() {
	fullscreen(!fullscreen());
}

 //save drawing as jpeg
 function keyPressed() { 
	 if (key == 's') { 
		  save("drummerLoadingScreenChristmas.jpg"); 
	 }
 }