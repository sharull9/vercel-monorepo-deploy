import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  { root: true },
  globalIgnores([
    ".next/**",
    "out/**",
    "dist/**",
    "node_modules/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    ".agents/**",
    ".turbo/**",
    ".claude/**",
  ]),
])
