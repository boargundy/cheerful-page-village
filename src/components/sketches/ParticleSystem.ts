
import p5 from "p5";

export const createParticleSystemSketch = (
  particleCount = 100,
  particleSize = 5,
  speedFactor = 1,
  colorPalette = ["#ff0000", "#00ff00", "#0000ff"]
) => {
  return (p: p5) => {
    const particles: Particle[] = [];

    class Particle {
      pos: p5.Vector;
      vel: p5.Vector;
      acc: p5.Vector;
      color: string;
      size: number;

      constructor() {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p5.Vector.random2D().mult(speedFactor);
        this.acc = p.createVector(0, 0);
        this.color = colorPalette[Math.floor(p.random(colorPalette.length))];
        this.size = particleSize;
      }

      update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Bounce off edges
        if (this.pos.x < 0 || this.pos.x > p.width) {
          this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > p.height) {
          this.vel.y *= -1;
        }
      }

      show() {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.pos.x, this.pos.y, this.size);
      }
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    p.draw = () => {
      p.background(0, 20);
      for (const particle of particles) {
        particle.update();
        particle.show();
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
};

export default createParticleSystemSketch;
