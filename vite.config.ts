import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: [
      { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/app/layouts')
      },
      {
        find: '@router',
        replacement: path.resolve(__dirname, 'src/app/router')
      },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/shared/components')
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/shared/constants')
      },
      {
        find: '@types',
        replacement: path.resolve(__dirname, 'src/shared/types')
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, 'src/shared/helpers')
      }
    ]
  }
});
