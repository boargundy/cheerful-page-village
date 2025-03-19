
import p5 from "p5";

export const createFluidSimulationSketch = () => {
  return (p: p5) => {
    let cols: number;
    let rows: number;
    const scale = 20;
    let inc = 0.1;
    let zoff = 0;
    let flowfield: p5.Vector[][];
    let particles: FluidParticle[] = [];
    
    class FluidParticle {
      pos: p5.Vector;
      vel: p5.Vector;
      acc: p5.Vector;
      maxSpeed: number;
      prevPos: p5.Vector;
      color: p5.Color;
      
      constructor() {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(0, 0);
        this.acc = p.createVector(0, 0);
        this.maxSpeed = 4;
        this.prevPos = this.pos.copy();
        this.color = p.color(p.random(170, 200), p.random(100, 255), p.random(200, 255), 5);
      }
      
      update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
      }
      
      follow(vectors: p5.Vector[][]) {
        let x = p.floor(this.pos.x / scale);
        let y = p.floor(this.pos.y / scale);
        x = p.constrain(x, 0, cols - 1);
        y = p.constrain(y, 0, rows - 1);
        let force = vectors[y][x].copy();
        this.applyForce(force);
      }
      
      applyForce(force: p5.Vector) {
        this.acc.add(force);
      }
      
      show() {
        p.stroke(this.color);
        p.strokeWeight(1);
        p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
      }
      
      updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
      }
      
      edges() {
        if (this.pos.x > p.width) {
          this.pos.x = 0;
          this.updatePrev();
        }
        if (this.pos.x < 0) {
          this.pos.x = p.width;
          this.updatePrev();
        }
        if (this.pos.y > p.height) {
          this.pos.y = 0;
          this.updatePrev();
        }
        if (this.pos.y < 0) {
          this.pos.y = p.height;
          this.updatePrev();
        }
      }
    }
    
    p.setup = () => {
      p.createCanvas(p.windowWidth, 400);
      p.colorMode(p.HSB, 255);
      p.background(0, 0, 20);
      
      cols = p.floor(p.width / scale);
      rows = p.floor(p.height / scale);
      
      flowfield = Array(rows).fill(null).map(() => Array(cols).fill(null));
      
      for (let i = 0; i < 1000; i++) {
        particles.push(new FluidParticle());
      }
    };
    
    p.draw = () => {
      p.background(0, 0, 20, 10);
      
      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
          let v = p5.Vector.fromAngle(angle);
          v.setMag(0.1);
          flowfield[y][x] = v;
          xoff += inc;
          
          // Uncomment to visualize the vector field
          // p.stroke(0, 50);
          // p.push();
          // p.translate(x * scale, y * scale);
          // p.rotate(v.heading());
          // p.line(0, 0, scale, 0);
          // p.pop();
        }
        yoff += inc;
      }
      zoff += 0.01;
      
      for (let particle of particles) {
        particle.follow(flowfield);
        particle.update();
        particle.edges();
        particle.show();
      }
    };
    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, 400);
      cols = p.floor(p.width / scale);
      rows = p.floor(p.height / scale);
      flowfield = Array(rows).fill(null).map(() => Array(cols).fill(null));
    };
  };
};
