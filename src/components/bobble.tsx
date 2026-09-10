import React, { type FC } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useVelocity,
  useTransform,
  MotionValue,
} from "framer-motion"; // Or import from 'motion/react'

interface BobbleCardProps {
    children:React.ReactNode;
    css:string,
}

export default function BobbleCard({ children, css }:BobbleCardProps){
  // Motion values for local element transformations
  const x: MotionValue<number> = useMotionValue(0);
  const y: MotionValue<number> = useMotionValue(0);
  const rotate: MotionValue<number> = useMotionValue(0);
  const scale: MotionValue<number> = useMotionValue(1);

  // Motion values to track pointer velocity
  const mouseX: MotionValue<number> = useMotionValue(0);
  const mouseY: MotionValue<number> = useMotionValue(0);

  const velocityX: MotionValue<number> = useVelocity(mouseX);
  const velocityY: MotionValue<number> = useVelocity(mouseY);

  // Combine X and Y velocities into absolute pointer speed
  const speed = useTransform([velocityX, velocityY], ([vx, vy]: number[]) =>
    Math.sqrt(vx * vx + vy * vy)
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleHoverStart = (): void => {
    const currentSpeed = speed.get();

    // Scale intensity based on cursor speed (capped for stability)
    const intensity = Math.min(currentSpeed / 1000, 2);

    // Dynamic offset based on mouse movement speed
    // const targetX = (Math.random() - 0.5) * 16 * intensity;
    const targetY = (Math.random() - 0.5) * 5 * intensity;
    const targetScale = 1 + 0.04 * Math.min(intensity, 1.1);

    // Bouncy spring physics configuration
    const springConfig = {
      type: "spring" as const,
      stiffness: 350,
      damping: 5,
      mass: 0.8,
    };

    // Trigger spring return to resting position
    // animate(x, [targetX, 0], springConfig);
    animate(y, [targetY, 0], springConfig);
    animate(scale, [targetScale, 1], springConfig);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onHoverStart={handleHoverStart}
      style={{ x, y, rotate, scale }}
      className={css}
    >
        {children}
    </motion.div>
  );
};