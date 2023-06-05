
import type { RollupOptions } from 'rollup';
import { resolve } from 'node:path';
import PluginDts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import PluginResolve from '@rollup/plugin-node-resolve';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const input = resolve(__dirname, '../vite-project/src/components/vue-virtual-layout/index.ts')
const externals = [
  'vue-demi',
  'vue'
]

const config: RollupOptions[] = [
  {
    input,
    output: [
      {
        file: resolve(__dirname, './dist/vue-virtual-layout.js'),
        format: 'umd',
        name: 'VueVirtualLayout',
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        },
      },
      {
        file: resolve(__dirname, './dist/vue-virtual-layout.esm.js'),
        format: 'esm',
      },
    ],
    external: [...externals],
    plugins: [
      typescript(), vue(), vueJsx(),
      PluginResolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
    ],
  },
  {
    input,
    output: [{ file: resolve(__dirname, './dist/vue-virtual-layout.d.ts'), format: 'es' }],
    external: [...externals],
    plugins: [
        PluginDts({
        tsconfig: resolve(__dirname, "./tsconfig.json"),
      })
    ],
  },
];

export default config;
