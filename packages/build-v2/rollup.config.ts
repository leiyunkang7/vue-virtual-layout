import type { RollupOptions } from 'rollup';
import { resolve } from 'node:path';
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss'
import tailwindcss from "tailwindcss";
import autoprefixer from 'autoprefixer';
import PluginDts from "rollup-plugin-dts";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const input = resolve(__dirname, '../vite-project/src/components/vue-virtual-layout/index.ts')
const externals = [
  'vue-demi',
  'vue',
  '@vue-virtual-layout/v2',
  '@vue/composition-api'
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

      createVuePlugin({
        jsx: true,
        jsxOptions: {
          compositionAPI: true
        }
      }) as any,
      postcss({
        extensions: ['.css'],
        extract: resolve(__dirname, './dist/vue-virtual-layout.css'),
        sourceMap: true,
        plugins: [ tailwindcss,  autoprefixer],
      }),
      esbuild(),
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
