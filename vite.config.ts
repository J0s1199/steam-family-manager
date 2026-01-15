import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/steam-family-manager/', // IMPORTANTE: Reemplaza 'steam-family-manager' con el nombre exacto de tu repositorio de GitHub.
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // Definimos las variables de entorno de Supabase para que estén disponibles en el build de GitHub Pages
        'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://firmhdurxnxafkwclkxg.supabase.co'),
        'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpcm1oZHVyeG54YWZrd2Nsa3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MDAyNjQsImV4cCI6MjA4Mzk3NjI2NH0.bCyYoD-Zu1S3hptuhDFFzTAibm1foH-6dzgSgbrJlUM')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});