import { spawnSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function publishCurrentResume(dest) {
  const result = spawnSync(
    process.execPath,
    dest
      ? ['scripts/publish-current-resume.mjs', dest]
      : ['scripts/publish-current-resume.mjs'],
    { stdio: 'inherit' }
  );
  if (result.status !== 0) {
    throw new Error('Could not publish the _current resume.');
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'resume-shortcut',
      buildStart() {
        publishCurrentResume();
      },
      configureServer(server) {
        publishCurrentResume();
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
      closeBundle() {
        publishCurrentResume('dist/resume.pdf');
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
