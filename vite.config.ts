import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {

    alias: {
      fonts: "/src/assets/fonts",
      src: "/src"
    },
  },
<<<<<<< HEAD
  base:"./"
=======
  base: "./",
>>>>>>> d21a9bc982e9e85ea5bc2358d14ee1713c8df421

})
