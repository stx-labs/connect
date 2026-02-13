import { defineConfig } from 'tsup';

import { version } from './package.json';
import { replace } from 'esbuild-plugin-replace';

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

  esbuildOptions(options) {
    options.plugins?.push(
      replace({
        __VERSION__: version,
      })
    );
  },
});
