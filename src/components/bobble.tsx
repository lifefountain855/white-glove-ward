import React, { type FC } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useVelocity,
  useTransform,
  MotionValue,
} from "framer-motion"; // Or import from 'motion/react'

export interface ListCardItem {
  id: string;
  title: string;
  subtitle?: string;
}

const ITEMS: ListCardItem[] = [
  {
    id: "01",
    title: "Design Systems",
  },
  {
    id: "02",
    title: "Interactive Prototypes",
    subtitle: "High-fidelity micro-interactions",
  },
  {
    id: "03",
    title: "Spring Physics Engine",
    subtitle: "Natural & fluid motion dynamics",
  },
  {
    id: "04",
    title: "Micro-interactions",
    subtitle: "Delightful touch states & subtle hover effects",
  },
  {
    id: "05",
    title: "Motion Architecture",
    subtitle: "Scalable animation choreography",
  },
];

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
    const targetY = (Math.random() - 0.5) * 12 * intensity;
    const targetScale = 1 + 0.04 * Math.min(intensity, 1.1);

    // Bouncy spring physics configuration
    const springConfig = {
      type: "spring" as const,
      stiffness: 350,
      damping: 50,
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

export function SingleColumnBobbleList() {
  return (
    <section className="w-full max-w-lg mx-auto py-10 px-4">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Interactive Components
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hover over cards with varying speed to feel the spring velocity effect.
        </p>
      </header>

      {/* Single Column Layout Container */}
      <div className="flex flex-col space-y-3">
        {ITEMS.map((item) => (
          <BobbleCard key={item.id} css='relative flex items-center justify-between p-5 rounded-2xl select-none shadow-md hover:shadow-xl transition-shadow duration-300'>
            <div className="flex items-center space-x-4">
                <span className="text-sm font-extrabold opacity-60 font-mono">
                {item.id}
                </span>
                <div>
                <h3 className="text-lg font-bold tracking-tight leading-tight">
                    {item.title}
                </h3>
                {item.subtitle && (
                    <p className="text-sm opacity-80 mt-0.5">{item.subtitle}</p>
                )}
                </div>
            </div>
        </BobbleCard>
        ))}
      </div>
    </section>
  );
}