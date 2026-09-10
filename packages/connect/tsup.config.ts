import { defineConfig } from 'tsup';

import { version } from './package.json';

export default defineConfig({
  format: ['cjs', 'esm', 'iife'],
  outDir: 'dist',
  external: ['@stacks/connect-ui', '@reown/appkit-universal-connector', '@reown/appkit'],

  clean: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,

  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,

  metafile: !!process.env.ANALYZE,

  // Note: pushing a replace plugin in `esbuildOptions()` does not work — esbuild
  // collects plugins before that hook runs.
  define: {
    __VERSION__: JSON.stringify(version),
  },
});
