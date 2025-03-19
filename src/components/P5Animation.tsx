
import { useEffect, useRef } from "react";
import p5 from "p5";

interface P5AnimationProps {
  sketch: (p: p5) => void;
  className?: string;
}

const P5Animation = ({ sketch, className }: P5AnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (containerRef.current && !p5Instance.current) {
      p5Instance.current = new p5(sketch, containerRef.current);
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [sketch]);

  return <div ref={containerRef} className={className} />;
};

export default P5Animation;
