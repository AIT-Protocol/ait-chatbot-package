import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

const babelOptions = {
  babelHelpers: 'runtime',
  exclude: /node_modules/,
  presets: [
    ['@babel/preset-env', { targets: "defaults" }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true,
      useESModules: true
    }]
  ]
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: ["react", "react-dom"],
  plugins: [
    postcss({
      extensions: ['.css', '.scss'], // Add .scss if you're using SASS
      extract: true, // This extracts CSS to a separate file; set a specific path if needed
      minimize: true,
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel(babelOptions),
    terser()
  ]
};
