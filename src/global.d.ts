/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_API_VERSION: string;
    SANITY_API_TOKEN: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_GA_ID?: string;
  }
}

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.glb" {
  const content: string;
  export default content;
}

declare module "*.gltf" {
  const content: string;
  export default content;
}

declare module "*.hdr" {
  const content: string;
  export default content;
}

interface Window {
  __LENIS__: import("lenis").default;
  gtag?: (...args: unknown[]) => void;
}