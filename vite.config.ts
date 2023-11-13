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
export default defineConfig(({command}) => {
    if (command === "serve") { //dev config
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
    return {}
})
