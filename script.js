
// python -m  http.server
let allBalls = [];
let myFrameCount = 0;
let obj, obj2;


function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);
  obj = new Obje(0, 50, 1700, 100);
 obj2 = new Obje(0, 500, 1700, 100);
  background(30);

  for (let i = 0; i < 1; i++) {
    allBalls.push(new Ball(random(width), random(height), 20));
  }
}

function draw() {
  myFrameCount++;
  background(30);

  
  obj.move();
  obj2.move();
  obj.display();
  obj2.display();

  for (let i = 0; i < allBalls.length; i++) {
    allBalls[i].checkKeys();
    allBalls[i].update();
    allBalls[i].checkEdges();
    allBalls[i].display();
  }
}

class Obje {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.currentY = y;
    this.offset = 0;
  }
 
  move() {
  let smooth = sin(myFrameCount * 0.4) * 15;
  let shake = random(-5, 5);
  this.currentY = this.y + smooth + shake;
}

  display() {
    fill(255, 0, 0);
    rect(this.x, this.currentY, this.w, this.h);
  }
}

class Ball {
  constructor(x, y, r) {
    this.red = random(255);
    this.blue = random(255);
    this.green = random(255);

    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.r = r;
    this.topSpeed = 10;
    this.friction = 1.00; 
  }

  checkKeys() {
    let forceMagnitude = 0.5; // Reduced force for better control
    if (keyIsDown(LEFT_ARROW)) this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
    if (keyIsDown(UP_ARROW)) this.applyForce(createVector(0, -forceMagnitude));
    if (keyIsDown(DOWN_ARROW)) this.applyForce(createVector(0, forceMagnitude));
    
    if (myFrameCount === 1) {
      this.applyForce(
        createVector(
          random(-forceMagnitude * 10, forceMagnitude * 10),
          random(-forceMagnitude * 10, forceMagnitude * 10)
        )
      );
    }
  }

  checkEdges() {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.topSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0); 
    this.vel.mult(this.friction);
  }

  display() {
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
} 
