import path from "path";
import { defineConfig, type Options } from "tsup";

const env = process.env.NODE_ENV;

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  target: "es2020",
  format: ["cjs", "esm"], // Ensure both cjs and esm formats are generated
  entry: ["./src/*.{ts,tsx}", "./src/@types/**/*.{ts,tsx}"],
  skipNodeModulesBundle: true,
  minify: !options.watch && env === "production",
  bundle: false,
  clean: true,
  dts: true,
  sourcemap: env === "production",
  outDir: "dist",
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  esbuildOptions(options) {
    options.outbase = "src";
  },
  external: ["axios"],
  ...options,
}));
