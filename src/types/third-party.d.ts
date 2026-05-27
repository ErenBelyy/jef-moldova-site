// ─── Lenis ───────────────────────────────────────────────────────────────────
declare module "lenis" {
  export interface LenisOptions {
    wrapper?: Window | HTMLElement;
    content?: HTMLElement;
    duration?: number;
    easing?: (t: number) => number;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal" | "both";
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    syncTouch?: boolean;
  }

  export type ScrollCallback = (data: { scroll: number; limit: number; velocity: number; direction: number; progress: number }) => void;

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    on(event: "scroll", callback: ScrollCallback): void;
    off(event: "scroll", callback: ScrollCallback): void;
    destroy(): void;
    stop(): void;
    start(): void;
    scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }): void;
  }
}

// ─── GSAP ScrollTrigger (extends existing types) ─────────────────────────────
declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: gsap.plugins.ScrollTriggerStatic;
  export default ScrollTrigger;
}

declare module "gsap/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(target: string | Element | Element[], vars?: { type?: string; linesClass?: string; wordsClass?: string; charsClass?: string });
    revert(): void;
  }
}

// ─── @react-three/drei extras ─────────────────────────────────────────────────
declare module "@react-three/drei" {
  export const MeshDistortMaterial: React.ForwardRefExoticComponent<
    {
      distort?: number;
      speed?: number;
      color?: string;
      transparent?: boolean;
      opacity?: number;
      wireframe?: boolean;
      roughness?: number;
      metalness?: number;
      attach?: string;
    } & React.RefAttributes<THREE.MeshStandardMaterial>
  >;
}