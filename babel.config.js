/* eslint-env node */
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "lbh-frontend-react": ["./node_modules/lbh-frontend-react/dist/cjs"],
          remultiform: ["./node_modules/remultiform/dist/cjs"],
        },
      },
    ],
  ],
};
