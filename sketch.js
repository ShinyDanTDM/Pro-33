let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine;
let world;
let ground;
let divisions = [];
let plinkos = [];
let particle;
let divisionHeight = 300;
let score = 0;
let turn = 0;
let gameState = "start";

// Array to store division positions and scores
let divisionInfo = [];

function setup() {
  createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  ground = new Ground(width / 2, height - 10, width, 20);

  // Create divisions and assign random scores
  for (let i = 0; i <= width; i = i + 80) {
    let scoreValue = Math.floor(random(1, 10)) * 50;
    divisions.push(new Division(i, height - divisionHeight / 2, 10, divisionHeight));
    divisionInfo.push({ x: i, y: height - divisionHeight / 2, score: scoreValue });
  }

  // Create plinkos
  for (let j = 40; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75, 10));
  }
  for (let j = 15; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175, 10));
  }
}

function draw() {
  background(0);
  Engine.update(engine);

  // Display ground
  ground.display();

  // Display divisions
  for (let i = 0; i < divisions.length; i++) {
    divisions[i].display();
    // Display scores for divisions
    textSize(20);
    fill(255);
    text(divisionInfo[i].score, divisionInfo[i].x - 10, divisionInfo[i].y + 10);
  }

  // Display plinkos
  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  // Display score
  textSize(20);
  fill(255);
  text("Score: " + score, 20, 30);

  // If game is in play state
  if (gameState === "play") {
    // Display particle
    if (particle !== null) {
      particle.display();

      // Check if particle crosses yellow line
      if (particle.body.position.y > 760) {
        // Determine score based on particle's position
        for (let i = 0; i < divisionInfo.length; i++) {
          if (
            particle.body.position.x > divisionInfo[i].x - 40 &&
            particle.body.position.x < divisionInfo[i].x + 40
          ) {
            score += divisionInfo[i].score;
            break;
          }
        }
        particle = null;

        // Check if all turns are completed
        if (turn === 5) {
          gameState = "end";
        }
      }
    }
  } else if (gameState === "end") {
    textSize(50);
    fill(255, 0, 0);
    text("Game Over", 100, 400);
  }
}

function mousePressed() {
  if (gameState !== "end") {
    if (turn < 5) {
      particle = new Particle(mouseX, 10, 10, color(random(0, 255), random(0, 255), random(0, 255)));
      turn++;
    } else {
      gameState = "end";
    }
  }
}
