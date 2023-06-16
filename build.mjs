import { build } from 'esbuild';
import tsPaths from 'esbuild-ts-paths';

await build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node18',
  packages: 'external',
  plugins: [tsPaths()],
});
