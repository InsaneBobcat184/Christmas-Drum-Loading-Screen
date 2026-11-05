//drum
function drawDrum(cx, cy) {
	let drumWidth = 350;
	let drumHeight = 216;
	let rimHeight = 40;

	// drum middle body
	noStroke();
	fill(180, 0, 20);
	rectMode(CENTER);
	rect(cx, cy, drumWidth, drumHeight);

	//drum bottom
	stroke(220);
	strokeWeight(6);
	ellipse(width / 2, height / 4 * 3 + 100, 350, 75);
	noStroke();
	ellipse(width / 2, height / 4 * 3 + 95, 350, 75);

	//vertical tension rods
	let rodCount = 8;

	stroke(220);

	let topY = cy - drumHeight / 2 + 12;
	let bottomY = cy + drumHeight / 2 + 2;

	let a = drumWidth / 2; // ellipse radius x
	let b = rimHeight / 2; // ellipse radius y

	for (let i = 0; i < rodCount; i++) {
		let x = cx - a + 25 + i * (drumWidth - 50) / (rodCount - 1);

		// normalize x into ellipse space
		let nx = (x - cx) / a;
		
		nx = constrain(nx, -1, 1);

		// find y position on bottom ellipse
		let curveOffset = sqrt(1 - nx * nx) * b;
		let yBottom = bottomY + curveOffset;

		line(x, topY, x, yBottom);
	}

	//drum top
	fill("green");
	ellipse(width / 2, height / 4 * 3 - 100, 350, 75);
}

//drum sticks
function drawStick(x, y, angle) {
	stroke(164, 116, 73);
	fill(164, 116, 73);
	let length = 180;
	let x2 = x + cos(angle) * length;
	let y2 = y + sin(angle) * length;
	line(x, y, x2, y2);
	circle(x2, y2, 12);
}

//drum stick animation
function drawSticks() {
	let holdTime = constrain(map(progress, 0, barLength, 80, 5), 5, 80);
	let pivotY = height / 4 * 3 - 220; // pivot is in the air above the drum
	let leftX = width / 2 - 220;
	let rightX = width / 2 + 220;

	// two simple angles for choppy beating motion
	let upAngle = -0.6; // stick in air
	let downAngle = 0.7; // stick hits the drum

	let angleA;
	let angleB;

	if (stickState === 0) {
		angleA = downAngle;
		angleB = upAngle;
	} else {
		angleA = upAngle;
		angleB = downAngle;
	}

	//drum sticks
	strokeWeight(15);
	drawStick(leftX, pivotY, angleA); // left stick
	drawStick(rightX, pivotY, -angleB + PI); // right stick 

	// hit point for left stick
	let hitLeft = {
		x: leftX + cos(angleA) * 180,
		y: pivotY + sin(angleA) * 180
	};

	// hit point for right stick
	let hitRight = {
		x: rightX + cos(-angleB + PI) * 180,
		y: pivotY + sin(-angleB + PI) * 180
	};

	if (stickState === 0) {
		drawImpact(hitLeft.x, hitLeft.y);
	}

	if (stickState === 1) {
		drawImpact(hitRight.x, hitRight.y);
	}

	// timing
	frameCountHold++;
	if (frameCountHold > holdTime) {
		frameCountHold = 0;
		stickState = 1 - stickState; 
	}
}

//impact beats animation
function drawImpact(x, y) {
	stroke("black");
	strokeWeight(3);

	let size = 20;
	line(x, y - size, x, y - size * 1.5); // top
	line(x, y + size, x, y + size * 1.5); // bottom
	line(x - size, y, x - size * 1.5, y); // left
	line(x + size, y, x + size * 1.5, y); // right

	// diagonal impact lines
	line(x - size, y - size, x - size * 1.3, y - size * 1.3);
	line(x + size, y - size, x + size * 1.3, y - size * 1.3);
	line(x - size, y + size, x - size * 1.3, y + size * 1.3);
	line(x + size, y + size, x + size * 1.3, y + size * 1.3);
}