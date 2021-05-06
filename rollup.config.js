import resolve from "rollup-plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import { uglify } from "rollup-plugin-uglify"
import commonjs from "rollup-plugin-commonjs"
export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.iife.js",
      format: "iife",
      name: "leoTools",
    },
    {
      file: "dist/bundle.esm.js",
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    uglify(),
  ],
}
