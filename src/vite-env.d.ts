/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_TRACKING_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.webp?url" {
  const value: string
  export default value
}

declare module "*.webp" {
  const value: string
  export default value
}
