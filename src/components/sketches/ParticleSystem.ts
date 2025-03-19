
import p5 from "p5";

class Particle {
  p: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  color: p5.Color;
  size: number;
  lifespan: number;
  maxSpeed: number;

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
    this.acceleration = p.createVector(0, 0);
    this.color = p.color(p.random(150, 255), p.random(150, 255), p.random(200, 255), p.random(150, 200));
    this.size = p.random(2, 8);
    this.lifespan = 255;
    this.maxSpeed = 2;
  }

  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  display() {
    this.p.noStroke();
    this.p.fill(this.color);
    this.p.circle(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }

  edges() {
    const p = this.p;
    if (this.position.x > p.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = p.width;
    }
    
    if (this.position.y > p.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = p.height;
    }
  }
}

export const createParticleSystemSketch = (options = {}) => {
  return (p: p5) => {
    let particles: Particle[] = [];
    let mouseAttraction = false;
    
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 255);
      
      // Initialize with some particles
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(p, p.random(p.width), p.random(p.height)));
      }
    };
    
    p.draw = () => {
      p.clear();
      
      // Add new particles occasionally
      if (p.frameCount % 5 === 0) {
        particles.push(new Particle(p, p.random(p.width), p.random(p.height)));
      }
      
      // Create a force towards the mouse when pressed
      if (mouseAttraction) {
        let mousePos = p.createVector(p.mouseX, p.mouseY);
        
        particles.forEach(particle => {
          let force = p5.Vector.sub(mousePos, particle.position);
          let distance = force.mag();
          distance = p.constrain(distance, 5, 100);
          force.normalize();
          force.mult(0.5 / (distance * 0.01));
          particle.applyForce(force);
        });
      }
      
      // Update and draw all particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].edges();
        particles[i].display();
        
        // Connect nearby particles with lines
        for (let j = i - 1; j >= 0; j--) {
          let d = p5.Vector.dist(particles[i].position, particles[j].position);
          if (d < 100) {
            p.stroke(255, 100 - d);
            p.line(
              particles[i].position.x, 
              particles[i].position.y, 
              particles[j].position.x, 
              particles[j].position.y
            );
          }
        }
        
        // Remove dead particles
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }
    };
    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    
    p.mousePressed = () => {
      mouseAttraction = true;
    };
    
    p.mouseReleased = () => {
      mouseAttraction = false;
    };
  };
};
