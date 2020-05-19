/* eslint-env node */
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { dirname } from "path";
import del from "rollup-plugin-delete";
import multiInput from "rollup-plugin-multi-input";
import progress from "rollup-plugin-progress";
import pkg from "./package.json";

const dependencies = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

let hadCriticalWarning = false;

const makeConfig = ({ outputDir, outputFormat, typescriptConfig }) => ({
  input: ["src/**/*.ts?(x)", "!**/__*__/**/*", "!**/*.(spec|test).*"],
  output: [
    {
      dir: outputDir,
      format: outputFormat,
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
      targets: outputDir,
      verbose: true,
    }),
    progress({
      clearLine: false,
    }),
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    typescript(typescriptConfig),
    babel({
      babelHelpers: "inline",
      extensions: [".ts", ".tsx"],
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
});

module.exports = [
  makeConfig({
    outputDir: dirname(pkg.module),
    outputFormat: "es",
    typescriptConfig: {
      declarationDir: dirname(pkg.types),
      declaration: true,
      declarationMap: true,
    },
  }),
  makeConfig({
    outputDir: dirname(pkg.main),
    outputFormat: "cjs",
    typescriptConfig: {},
  }),
];
