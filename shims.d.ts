declare module '*.mdx' {
    import type React from 'react'
    const ReactComponent: React.VFC
    export default ReactComponent
}

declare module "ldflex" {
    export class PathFactory {
        constructor(options?: unknown, data?: unknown)
        create(options: unknown): { [T in string]: unknown }
        get(): Promise<{ [T in string]: unknown }>
    }
}

declare module "rdf-sparql-builder" {
    export const deleteQuery: function;
    export const select: function;
}

declare module 'solid-namespace' {
    export default () => Record<string, (label: string) => string>;
}

declare module '@tpluscode/sparql-builder' {
    export const DELETE: function;
    export const SELECT: function;
}

declare module '@zazuko/rdf-vocabularies' {
    export const prefixes: Record<string, string>
}