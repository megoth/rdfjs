import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        {enforce: 'pre', ...mdx()},
        react(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                }),
                NodeModulesPolyfillPlugin(),
            ]
        }
    },
    build: {
        rollupOptions: {
            plugins: [
                rollupNodePolyFill()
            ]
        }
    }
})
