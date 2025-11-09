/// <reference types="vite/client" />

declare module "*.webp?url" {
  const value: string
  export default value
}

declare module "*.webp" {
  const value: string
  export default value
}

