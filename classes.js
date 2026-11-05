//snow animation
class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		// slow snow movement
		this.vx = random(-0.3, 0.3);
		this.vy = random(0.4, 1);

		this.alpha = 200;
		this.size = random(3, 6);
	}

	finished() {
		return this.y > height;
	}

	update() {
		// drift for snow
		this.x += this.vx + random(-0.05, 0.05);
		this.y += this.vy;
	}

	show() {
		noStroke();
		circle(this.x, this.y, this.size);
	}
}