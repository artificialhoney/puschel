import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  server: {
    proxy: {
      '/auth/login': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/graphql': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: false,
      },
    },
  },
  plugins: [react(), commonjs()],
});
