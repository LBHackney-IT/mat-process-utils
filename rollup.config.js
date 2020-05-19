/* eslint-env node */
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { dirname } from "path";
import del from "rollup-plugin-delete";
import multiInput from "rollup-plugin-multi-input";
import progress from "rollup-plugin-progress";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const dependencies = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

let hadCriticalWarning = false;

module.exports = {
  input: ["src/**/*.ts?(x)", "!**/__*__/**/*", "!**/*.(spec|test).*"],
  output: [
    {
      dir: dirname(pkg.main),
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: dirname(pkg.module),
      format: "es",
      sourcemap: true,
    },
  ],
  external: (id) =>
    dependencies.some((dependency) =>
      new RegExp(`^(.+/)?${dependency}(/.+)?$`).test(id)
    ),
  plugins: [
    multiInput(),
    del({
      targets: [dirname(pkg.main), dirname(pkg.module)],
      verbose: true,
    }),
    progress({
      clearLine: false,
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfigOverride: {
        exclude: ["**/__*__/**/*", "**/*.spec.*", "**/*.test.*"],
      },
    }),
    babel({
      babelHelpers: "inline",
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
    {
      generateBundle() {
        if (hadCriticalWarning) {
          throw new Error("A critical warning occurred");
        }
      },
    },
  ],
  onwarn(warning, onwarn) {
    onwarn(warning, onwarn);

    if (!warning.message.startsWith("Generated an empty chunk: ")) {
      hadCriticalWarning = true;
    }
  },
};
