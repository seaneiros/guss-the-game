import path from 'path';
import { defineConfig }  from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
    base: __dirname,
    publicDir: false,
    plugins: [
      viteTsconfigPaths(),
    ],
    resolve: {
      alias: {
        '@': __dirname,
        'src': `${__dirname}/src`,
      },
    },
    build: {
      ssr: true,
      lib: {
        entry: path.resolve(__dirname, 'server.ts'),
        formats: [ 'cjs' ],
      },
      outDir: __dirname,
    },
    ssr: {
      target: 'node',
      noExternal: [],
    },
});
