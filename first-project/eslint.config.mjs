import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

 
// @type {import('eslint').Linter.FlatConfig[]} 

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules", "dist"], // Replace ".eslintignore"
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        process: "readonly", // Example of a custom global
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Add basic JavaScript and TypeScript rules
      ...js.configs.recommended.rules, // JavaScript rules
      ...tseslint.configs["recommended"].rules, // TypeScript rules
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

