
import p5 from "p5";

interface Particle {
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  color: p5.Color;
  alpha: number;
  size: number;
  lifespan: number;
  maxLifespan: number;
}

// Create a factory function that creates and returns the particle system sketch
export const createParticleSystemSketch = () => {
  return (p: p5) => {
    // System properties
    let particles: Particle[] = [];
    let maxParticles = 200;
    let emissionRate = 4;
    let mousePos: p5.Vector;
    let lastMousePos: p5.Vector;
    let colorPalette: p5.Color[] = [];
    
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.style('display', 'block');
      p.colorMode(p.HSB, 360, 100, 100, 1);
      
      // Create color palette
      colorPalette = [
        p.color(210, 90, 100), // Blue
        p.color(150, 80, 100), // Teal
        p.color(270, 80, 100), // Purple
        p.color(330, 80, 100), // Pink
      ];
      
      mousePos = p.createVector(p.width / 2, p.height / 2);
      lastMousePos = p.createVector(p.width / 2, p.height / 2);
    };

    p.draw = () => {
      p.clear();
      
      // Update mouse position with easing
      lastMousePos = p.createVector(mousePos.x, mousePos.y);
      mousePos.x = p.lerp(mousePos.x, p.mouseX, 0.2);
      mousePos.y = p.lerp(mousePos.y, p.mouseY, 0.2);
      
      // Calculate mouse velocity for dynamic particle emission
      const mouseVel = p5.Vector.sub(mousePos, lastMousePos);
      const speed = mouseVel.mag();
      
      // Adjust emission based on mouse movement
      const currentEmissionRate = p.map(speed, 0, 50, 1, emissionRate * 3);
      
      // Emit new particles
      if (particles.length < maxParticles) {
        for (let i = 0; i < currentEmissionRate; i++) {
          if (particles.length < maxParticles) {
            addParticle();
          }
        }
      }
      
      // Update and display all particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Update
        particle.vel.add(particle.acc);
        particle.pos.add(particle.vel);
        particle.lifespan -= 2;
        particle.alpha = p.map(particle.lifespan, 0, particle.maxLifespan, 0, 1);
        
        // Display
        p.noStroke();
        const c = particle.color;
        p.fill(p.hue(c), p.saturation(c), p.brightness(c), particle.alpha);
        p.circle(particle.pos.x, particle.pos.y, particle.size);
        
        // Remove dead particles
        if (particle.lifespan <= 0) {
          particles.splice(i, 1);
        }
      }
    };
    
    p.mouseMoved = () => {
      // Update the mouse position when it moves
      mousePos.x = p.mouseX;
      mousePos.y = p.mouseY;
    };
    
    function addParticle() {
      // Add variation to particle spawn position
      const offset = p.createVector(
        p.random(-10, 10),
        p.random(-10, 10)
      );
      
      // Create new particle
      const particle: Particle = {
        pos: p5.Vector.add(mousePos, offset),
        vel: p.createVector(p.random(-1, 1), p.random(-1, 1)).mult(p.random(0.5, 2)),
        acc: p.createVector(0, 0),
        color: colorPalette[Math.floor(p.random(colorPalette.length))],
        alpha: 1,
        size: p.random(3, 15),
        lifespan: p.random(40, 100),
        maxLifespan: p.random(40, 100)
      };
      
      particles.push(particle);
    }
    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
};

// For backward compatibility, also export the default function
export default createParticleSystemSketch;
