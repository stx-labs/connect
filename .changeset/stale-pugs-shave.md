---
'@stacks/connect': patch
---

Fix `window.__CONNECT_VERSION__` being stamped with the literal string `__VERSION__` instead of the package version.

The replacement was registered by pushing `esbuild-plugin-replace` onto `options.plugins` inside tsup's `esbuildOptions()` hook, which runs after esbuild has already collected its plugins, so it never applied. The version is now substituted with esbuild's `define` option, which is applied to all output formats (`cjs`, `esm`, `iife`).
