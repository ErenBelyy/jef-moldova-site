"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringX = useSpring(cursorX, { damping: 20, stiffness: 200 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 200 });

  const isHovering = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };
    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[99999] top-0 left-0 w-2 h-2 rounded-full bg-emerald-400 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[99998] top-0 left-0 w-10 h-10 rounded-full border border-emerald-400/40 -translate-x-[16px] -translate-y-[16px] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
      />
    </>
  );
}