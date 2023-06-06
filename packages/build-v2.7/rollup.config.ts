
import type { RollupOptions } from 'rollup';
import { resolve } from 'node:path';
import PluginDts from "rollup-plugin-dts";
// import typescript from '@rollup/plugin-typescript';
import vue2 from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import path from 'path';
// import PluginResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const input = resolve(__dirname, '../vite-project/src/components/vue-virtual-layout/index.ts')
const externals = [
  'vue-demi',
  'vue',
  '@vue-virtual-layout/v2.7'
]

const config: RollupOptions[] = [
  {
    input,
    output: [
      {
        file: resolve(__dirname, './dist/vue-virtual-layout.cjs'),
        format: 'cjs',
      },
      {
        file: resolve(__dirname, './dist/vue-virtual-layout.mjs'),
        format: 'es',
      },
    ],
    external: [...externals],
    plugins: [
      vue2(),
      vueJsx(),
      esbuild(),
      // typescript(),
      // PluginResolve({
      //   extensions: ['.js', '.jsx', '.ts', '.tsx']
      // }),
    ],
  },
  {
    input: resolve(__dirname, './dist/vue-virtual-layout.mjs'),
    output: [{ file: resolve(__dirname, './dist/vue-virtual-layout.d.ts'), format: 'es' }],
    external: [...externals],
    plugins: [
        PluginDts({
        // tsconfig: resolve(__dirname, "./tsconfig.json"),
      })
    ],
  },
];

export default config;
