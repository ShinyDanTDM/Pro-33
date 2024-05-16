class Division {
    constructor(x, y, width, height) {
      this.body = Matter.Bodies.rectangle(x, y, width, height, { isStatic: true });
      Matter.World.add(world, this.body);
      this.width = width;
      this.height = height;
    }
  
    display() {
      let pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER);
      fill(255);
      rect(0, 0, this.width, this.height);
      pop();
    }
  }
  