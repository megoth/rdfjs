import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

const baseConfig = {
    plugins: [
        {enforce: 'pre', ...mdx()},
        react(),
    ],
    build: {
        rollupOptions: {
            plugins: [
                rollupNodePolyFill()
            ]
        },
    }
}

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineConfig((config) => {
    if (config?.command === "serve") { //dev config
        return {
            ...baseConfig,
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
                    ]
                }
            },
        }
    }
    return { // prod config
        ...baseConfig,
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
    }
})
