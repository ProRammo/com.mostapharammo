var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize', function(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

var dist = function(x1, y1, x2, y2){
	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt( a*a + b*b );
}

var genColor = function() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function Circle(x, y, vx, vy, radius, color) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.oradius = this.radius;
	this.color = color;
	this.fill = true;


	this.draw = function() {
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.stroke();
		if (this.fill) c.fill();
	}

	this.update = function() {

		if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
			this.vx = -this.vx;
		}
		if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
			this.vy = -this.vy;
		}
		if (this.y < innerHeight/10){
			if (this.vy > 0)
				this.vy = Math.abs(this.vx)
			else
				this.vy = -1 * Math.abs(this.vx)
		}

		// interactivity
		if ( dist(this.x, this.y, mouse.x, mouse.y) < 40 ){
			if (this.radius < 5) this.radius += 1;
		}
		else{
			this.fill = true;
			if (this.radius > this.oradius) this.radius -= this.oradius;
		}

		this.x += this.vx;
		this.y += this.vy;
	}

}

var circles = [];
var color = 'rgba(153,153,153,0.15)';
for (var i = 0; i < 1000; i++){
	let radius = Math.max(Math.random() * 3, 1);
	let x = Math.random() * (innerWidth - radius * 2) + radius;
	let y = 99*innerHeight/100 + Math.random() * (innerHeight/100 - radius * 2) + radius;
	
	let vx = (Math.random() - 0.5);
	let vy = (Math.random() - 0.7);
	circles[i] = new Circle(x, y, vx, vy, radius, color);
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);

	for (var i = 0; i < circles.length; i++){
		circles[i].draw();
		circles[i].update();
	}

}

animate();