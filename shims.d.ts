declare module '*.mdx' {
    import type React from 'react'
    const ReactComponent: React.VFC
    export default ReactComponent
}

declare module "rdf-sparql-builder" {
    export const deleteQuery: function;
    export const select: function;
}

declare module 'solid-namespace' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export default (factory: unknown) => Record<string, (label: string) => string>;
}

declare module '@tpluscode/sparql-builder' {
    export const DELETE: function;
    export const SELECT: function;
}

declare module '@zazuko/rdf-vocabularies' {
    export const prefixes: Record<string, string>
}

declare module 'grapoi' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export default (...args: Array<unknown>) => unknown;
}