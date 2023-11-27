import {defineConfig} from "cypress";
import customViteConfig from "./vite.config";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:5173"
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
            viteConfig: customViteConfig
        },
    },
});
