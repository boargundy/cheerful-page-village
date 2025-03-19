
import p5 from "p5";

export const createInteractiveWavesSketch = () => {
  return (p: p5) => {
    let waves: Wave[] = [];
    let numWaves = 5;
    
    class Wave {
      amplitude: number;
      period: number;
      phase: number;
      color: p5.Color;
      
      constructor(amp: number, period: number, phase: number) {
        this.amplitude = amp;
        this.period = period;
        this.phase = phase;
        this.color = p.color(
          p.random(100, 200), 
          p.random(100, 255), 
          p.random(200, 255), 
          p.random(50, 120)
        );
      }
      
      calculate(x: number): number {
        return Math.sin(this.phase + (p.TWO_PI * x) / this.period) * this.amplitude;
      }
      
      update() {
        this.phase += 0.05;
      }
      
      display() {
        p.noFill();
        p.stroke(this.color);
        p.strokeWeight(2);
        p.beginShape();
        
        for (let x = 0; x < p.width; x += 10) {
          let y = p.height / 2;
          for (let i = 0; i < numWaves; i++) {
            y += waves[i].calculate(x);
          }
          p.vertex(x, y);
        }
        
        p.endShape();
      }
    }
    
    p.setup = () => {
      p.createCanvas(p.windowWidth, 300);
      p.colorMode(p.HSB, 255);
      
      for (let i = 0; i < numWaves; i++) {
        waves.push(new Wave(
          p.random(10, 30),
          p.random(100, 600),
          p.random(0, p.TWO_PI)
        ));
      }
    };
    
    p.draw = () => {
      p.background(0, 0, 20, 20);
      
      // Update all waves
      for (let wave of waves) {
        wave.update();
        wave.display();
      }
      
      // Add interactive element - mouse movement affects wave properties
      if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        let mouseXNormalized = p.map(p.mouseX, 0, p.width, 0.5, 2);
        let mouseYNormalized = p.map(p.mouseY, 0, p.height, 0.5, 2);
        
        for (let i = 0; i < waves.length; i++) {
          waves[i].amplitude = 20 * mouseYNormalized;
          waves[i].period = 300 * mouseXNormalized;
        }
      }
    };
    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, 300);
    };
  };
};
