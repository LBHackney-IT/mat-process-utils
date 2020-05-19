/* eslint-env node */
const sharedPlugins = ["jsdoc", "react", "react-hooks", "prettier"];
const sharedExtends = [
  "eslint:recommended",
  "plugin:jsdoc/recommended",
  "plugin:react/recommended",
];
const sharedPrettierExtends = ["prettier", "prettier/react"];
const sharedRules = {
  "react/prop-types": "off",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
  "jsdoc/no-types": "error",
  "jsdoc/require-param": "off",
  "jsdoc/require-param-type": "off",
  "jsdoc/require-returns": "off",
  "jsdoc/require-returns-type": "off",
};

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [...sharedPlugins],
  extends: [...sharedExtends, ...sharedPrettierExtends],
  rules: { ...sharedRules },
  settings: {
    jsdoc: {
      mode: "typescript",
      tagNamePreference: {
        abstract: false,
        access: false,
        alias: false,
        async: false,
        arguments: false,
        author: false,
        borrows: false,
        callback: false,
        category: "category",
        class: false,
        classdesc: false,
        constant: false,
        constructs: false,
        copyright: false,
        default: false,
        deprecated: false,
        description: false,
        enum: false,
        example: false,
        exports: false,
        external: false,
        file: false,
        fires: false,
        function: false,
        generator: false,
        global: false,
        hideconstructor: false,
        implements: false,
        inheritdoc: false,
        inner: false,
        instance: false,
        interface: false,
        kind: false,
        lends: false,
        license: false,
        member: false,
        memberof: false,
        mixes: false,
        mixin: false,
        module: false,
        name: false,
        namespace: false,
        override: false,
        package: false,
        private: false,
        property: false,
        protected: false,
        public: false,
        readonly: false,
        requires: false,
        see: false,
        since: false,
        static: false,
        summary: false,
        this: false,
        throws: false,
        todo: false,
        tutorial: false,
        type: false,
        typedef: false,
        typeparam: "typeparam",
        variation: false,
        version: false,
        yields: false,
      },
    },
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: [...sharedPlugins, "@typescript-eslint"],
      extends: [
        ...sharedExtends,
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        ...sharedPrettierExtends,
        "prettier/@typescript-eslint",
      ],
      rules: { ...sharedRules },
    },
  ],
};
