import { defineConfig } from "tsdown"

export default defineConfig({
  entry: "./src/**",
  format: "esm",
  outDir: "./dist",
  clean: true,
  deps: {
    alwaysBundle: [],
  },
  fixedExtension: false,
})
