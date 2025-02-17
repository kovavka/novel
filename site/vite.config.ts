import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Novel',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      output: {
        assetFileNames: ({ originalFileName }) => {
          if (originalFileName?.includes('backgrounds/'))
            return 'backgrounds/[name]-[hash].[ext]'
          if (originalFileName?.includes('characters/')) return 'characters/[name]-[hash].[ext]'
          return 'assets/[name]-[hash].[ext]'
        },
      },
    },
  },
})
