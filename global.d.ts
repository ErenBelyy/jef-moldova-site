// Project-level global declarations for third-party modules and JSX elements
declare module "lenis" {
  type LenisOptions = any;
  class Lenis {
    constructor(options?: LenisOptions);
    raf(time?: number): void;
    on(event: string, cb: (...args: any[]) => void): void;
    destroy(): void;
  }
  export default Lenis;
}

declare module "gsap" {
  const gsap: any;
  export { gsap };
  export default gsap;
}

declare module "gsap/ScrollTrigger" {
  const ScrollTrigger: any;
  export { ScrollTrigger };
  export default ScrollTrigger;
}

declare module "framer-motion" {
  const anything: any;
  export const motion: any;
  export const AnimatePresence: any;
  export const useScroll: any;
  export const useTransform: any;
  export default anything;
}

declare module "lucide-react" {
  const icons: any;
  export = icons;
}

declare module "next-themes" {
  export const ThemeProvider: any;
  export type ThemeProviderProps = any;
}

declare module "@react-three/fiber" {
  export const Canvas: any;
  export function useFrame(cb: any): any;
  export function useThree(): any;
}

declare module "@react-three/drei" {
  export const MeshDistortMaterial: any;
  export const Sphere: any;
  export const Float: any;
  export const Stars: any;
  export const Trail: any;
}

declare module "three" {
  const THREE: any;
  export = THREE;
}

declare module "react" {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export type ReactNode = any;
  const React: any;
  export default React;
}

declare module "react/jsx-runtime" {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any): any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
      torusGeometry: any;
      meshBasicMaterial: any;
      mesh: any;
      ambientLight: any;
      pointLight: any;
      sphere: any;
    }
  }
}

export {};
