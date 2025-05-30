// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  sourcemap: true,
  dts: true,
  clean: true,
  minify: true,
  bundle: true,
  external: [],
});
