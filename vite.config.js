import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'resume-shortcut',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const path = req.url?.split('?')[0];
          if (path === '/resume' || path === '/resume/') {
            res.writeHead(302, { Location: '/resume.pdf' });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  base: '/',
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '/',
// });
