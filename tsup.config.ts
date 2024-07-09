import path from "path";
import { defineConfig, type Options } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  target: "es2020",
  format: ["cjs", "esm"], // generate cjs and esm files
  entry: ["./src/*.{ts,tsx}", "./src/@types/**/*.{ts,tsx}"],
  skipNodeModulesBundle: true, // Skips building dependencies for node modules
  minify: !options.watch && env === "production",
  bundle: false,
  clean: true, // clean up the dist folder
  dts: true, // generate dts file for main module
  sourcemap: env === "production", // source map is only available in prod
  outDir: "dist",
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  esbuildOptions(options, context) {
    options.outbase = "src";
  },
  external: ["axios"],
  ...options,
  // button: { js: '"use client";' },
}));
