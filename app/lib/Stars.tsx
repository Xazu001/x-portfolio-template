import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const speed = 0.75; // Increased speed for better effect

  // Initialize dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        populateStars();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Create a single star
  const createStar = (): Star => {
    return {
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      z: Math.random() * 1000 + 1, // Random depth
      size: Math.random() * 2 + 1, // Random size between 1 and 3
    };
  };

  // Populate stars array
  const populateStars = () => {
    const numStars = dimensions.width < 768 ? 200 : 250;
    starsRef.current = Array.from({ length: numStars }, () => createStar());
  };

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const updateStars = () => {
      context.fillStyle = "#000002";
      context.fillRect(0, 0, dimensions.width, dimensions.height);

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];

        // Move star closer to viewer
        star.z -= speed;

        // If star is too close, reset it
        if (star.z <= 0) {
          Object.assign(star, createStar());
        }

        // Calculate screen position
        const scale = 500 / star.z;
        const x = centerX + (star.x - centerX) * scale;
        const y = centerY + (star.y - centerY) * scale;

        // Calculate size based on distance (closer = bigger)
        const size = star.size * scale;

        // Calculate brightness based on distance
        const brightness = Math.min(1, (1000 - star.z) / 1000);

        // Draw star
        context.fillStyle = `rgba(180, 180, 255, ${brightness})`;
        context.shadowColor = "rgb(180, 180, 255)";
        context.shadowBlur = 12;
        context.beginPath();
        context.arc(x, y, size / 2, 0, Math.PI * 2);
        context.fill();
      }

      animationRef.current = requestAnimationFrame(updateStars);
    };

    populateStars();
    updateStars();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="top-0 left-0 -z-10 fixed w-full h-full"
    />
  );
}
