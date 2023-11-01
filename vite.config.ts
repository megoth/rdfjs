import {defineConfig} from 'vite'
import rakkas from "rakkasjs/vite-plugin";
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        {enforce: 'pre', ...mdx()},
        rakkas({
            pageExtensions: ["ts", "tsx", "mdx"],
        }),
    ],
})
