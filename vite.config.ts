import { defineConfig } from "vite";
import { resolve } from "path";
import pkg from "./package.json";
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      fileName: pkg.name,
    },
    // sourcemap: true,
    // chunkSizeWarningLimit: 5,
    // reportCompressedSize: false,
  },
});
