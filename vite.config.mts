import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default () => defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    allowedHosts: ['a3f1-82-15-16-190.ngrok-free.app'],
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    assetsDir: 'images',
    minify: true,
  },
  plugins: [
    react(),
    svgr(),
  ],
})
