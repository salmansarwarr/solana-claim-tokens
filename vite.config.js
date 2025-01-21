import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        inject({
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    resolve: {
        alias: {
            buffer: "buffer",
        },
    },
});
