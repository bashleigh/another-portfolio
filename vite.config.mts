import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default () => defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
  },
  resolve: {

  },
  build: {
    outDir: 'build',
    sourcemap: true,
    assetsDir: 'images',
  },
  plugins: [
    react(),
  ],
})
