import { AnimatePresence, motion } from "framer-motion";

interface TransitionWrapperProps {
  children: React.ReactNode;
  keyToAnimate?: string;
  directionY?: number;
  directionX?: number;
  delay?: number;
}

export default function TransitionWrapper({
  children,
  keyToAnimate = "pageTransitionWrapper",
  directionX,
  directionY,
  delay,
}: TransitionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyToAnimate}
        initial={{
          opacity: 0,
          x: directionX,
          y: directionY,
        }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
