import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import VueMacros from "unplugin-vue-macros/vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue({
          template: { transformAssetUrls },
        }),
      },
    }),
    quasar({
      sassVariables: "src/assets/scss/quasar-variables.scss",
    }),
    // eslintPlugin(),
  ],
  resolve: {
    alias: {
      "@middlewares": path.resolve(__dirname, "src/router/middlewares"),
      "@components": path.resolve(__dirname, "src/app/components"),
      "@composables": path.resolve(__dirname, "src/composables"),
      "@modules": path.resolve(__dirname, "src/app/modules"),
      "@layouts": path.resolve(__dirname, "src/app/layouts"),
      "@services": path.resolve(__dirname, "src/services"),
      "@pages": path.resolve(__dirname, "src/app/pages"),
      "@views": path.resolve(__dirname, "src/app/views"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@router": path.resolve(__dirname, "src/router"),
      "@types": path.resolve(__dirname, "src/types"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@tools": path.resolve(__dirname, "src/tools"),
      "@boot": path.resolve(__dirname, "src/boot"),
      "@app": path.resolve(__dirname, "src/app"),
      "@": path.resolve(__dirname, "src"),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    index: "./public/index.html",
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
}));
