import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        name: "ractiveRematch",
        file: "dist/ractive-rematch.umd.js",
        format: "umd"
      },
      {
        file: "esm/index.js",
        format: "esm"
      }
    ],
    plugins: [typescript()]
  },
  {
    input: "src/index.ts",
    output: [
      {
        name: "ractiveRematch",
        file: "dist/ractive-rematch.umd.min.js",
        format: "umd"
      }
    ],
    plugins: [terser(), typescript()]
  }
];
