import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/animal-idle',
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
