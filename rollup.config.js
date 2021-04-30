import resolve from "rollup-plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import { uglify } from "rollup-plugin-uglify"
import commonjs from "@rollup/plugin-commonjs"
export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.min.js",
    format: "iife",
    name: "LeoUtils",
    exports: "named",
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    uglify(),
  ],
}
