import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' lets the built site work from any path (GitHub Pages, Netlify, Vercel, a subfolder…)
export default defineConfig({
  plugins: [react()],
  base: './',
})
