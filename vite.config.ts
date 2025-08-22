import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import  tailwindcss from "@tailwindcss/vite"
export default defineConfig({
  server: {
    headers: {
      'Service-Worker-Allowed': '/',
    },
    proxy: {
      '/api': {
        target: 'http://192.168.100.78:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    allowedHosts: [
      'ebb5a53e0653.ngrok-free.app' 
    ]
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // esse é o ponto-chave
    },
  },
});
