declare module '*.mdx' {
    import type React from 'react'
    const ReactComponent: React.VFC
    export default ReactComponent
}

declare module 'solid-namespace' {
    export default () => Record<string, (label: string) => string>;
}