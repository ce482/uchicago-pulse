import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    extends: [
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
