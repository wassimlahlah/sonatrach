import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // هادي لازم تكون كاينة باش يمشي ريآكت
import tailwindcss from '@tailwindcss/vite' // هادي تاع التايلوند v4

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})