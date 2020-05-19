/* eslint-env node */
module.exports = {
  preset: "ts-jest",
  snapshotSerializers: ["<rootDir>/src/__tests__/serializers/pathSerializer"],
  restoreMocks: true,
  testMatch: ["**/*.+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["node_modules/", "<rootDir>/examples/"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
      babelConfig: "<rootDir>/babel.config.js",
    },
  },
};
