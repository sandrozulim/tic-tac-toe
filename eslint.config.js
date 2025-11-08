import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs["recommended-latest"],
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
      reactRefresh.configs.vite,
      ...pluginQuery.configs["flat/recommended"],
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
