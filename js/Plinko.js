class Plinko {
    constructor(x, y, radius) {
      let options = {
        restitution: 1,
        friction: 0,
        isStatic: true
      };
      this.body = Matter.Bodies.circle(x, y, radius, options);
      Matter.World.add(world, this.body);
      this.radius = radius;
    }
  
    display() {
      let pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      ellipseMode(RADIUS);
      fill(0);
      ellipse(0, 0, this.radius, this.radius);
      pop();
    }
  }
  