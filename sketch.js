let sparks = [];
let img;
let trex;

// Load the emergency flare image and Trex image
function preload() {
  trex = loadImage('assets/tRex.png');
  img = loadImage('assets/emergencyFlare.png');
}

function setup() {
  createCanvas(800, 600); // Create a canvas of 800x600 pixels
  background(0); // Set the background to black
}

function draw() {
  background(0, 50); // Slightly transparent background for trailing effect
  // Draw the trex
  image(trex, width/11, height/3, 350, 309);
  cursor('assets/emergencyFlare.png');
  if (mouseIsPressed) {
    sparks.push(new Spark(mouseX, mouseY)); // Emit new particles
  }

  // Update and display particles
  for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].display();

      if (sparks[i].isFinished()) {
          sparks.splice(i, 1); // Remove finished particles
      }
  }
}

class Spark{
  constructor(x, y) {
    this.position = createVector(x, y); // Particle position
    this.velocity = p5.Vector.random2D(); // Random direction
    this.lifespan = 255; // Makes particle fade out
}

update() {
  this.velocity.add(createVector(0, -0.02)); // Add gravity
  this.position.add(this.velocity);
  this.lifespan -= 2;
}

display() {
  let r = map(this.lifespan, 0, 255, 255, 190); // Red based on lifespan
  let g = map(this.lifespan, 0, 255, 0, 180); // Green based on lifespan
  let b = map(this.lifespan, 0, 255, 50, 90); // Blue based on lifespan
  stroke(r, g, b); // Use color based on lifespan
  strokeWeight(map(this.lifespan, 0, 255, 0, 15)); // Particles get smaller with lifespan
  point(this.position.x, this.position.y);
}

isFinished() {
  return this.lifespan < 0; // Check if particle should be removed
}
}