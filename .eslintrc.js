module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb",
  plugins: ["@html-eslint"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: "off",
    "linebreak-style": "off",
    quotes: ["error", "double"],
    "@next/next/no-img-element": "off",
    "@html-eslint/require-img-alt": "error",
    "@html-eslint/require-doctype": "off",
    "@html-eslint/no-multiple-h1": "error",
    "@html-eslint/require-closing-tags": "error",
    "@html-eslint/require-li-container": "error",
    "@html-eslint/no-duplicate-id": "error",
    "@html-eslint/no-extra-spacing-attrs": "error",
    "no-restricted-imports": ["error", "import1", "import2"],
    "@html-eslint/no-duplicate-attrs": "error",
    "@html-eslint/no-duplicate-id": "error",
    "@html-eslint/no-inline-styles": "error",
    "@html-eslint/no-restricted-attrs": [
      "error",
      {
        tagPatterns: ["^div$", "^img$"],
        attrPatterns: ["data-.*"],
        message: "'data-x' is restricted.",
      },
    ],
  },
};
