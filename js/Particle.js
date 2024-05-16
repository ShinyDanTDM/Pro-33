class Particle {
    constructor(x, y, radius, color) {
      let options = {
        restitution: 0.4,
        friction: 0
      };
      this.body = Matter.Bodies.circle(x, y, radius, options);
      Matter.World.add(world, this.body);
      this.radius = radius;
      this.color = color;
    }
  
    display() {
      let pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      ellipseMode(RADIUS);
      fill(this.color);
      ellipse(0, 0, this.radius, this.radius);
      pop();
    }
  }
  