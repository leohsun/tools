import resolve from '@rollup/plugin-node-resolve'
import babel from "@rollup/plugin-babel"
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import pkg from "./package.json"
export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "leoTools",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  plugins: [
    commonjs({
      strictRequires: false
    }),
    resolve(),

    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    terser(),
  ],
}
