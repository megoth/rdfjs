declare module 'rdf-ext' {
    import {Literal, NamedNode, Quad} from "@rdfjs/types"

    export class Dataset {
        toCanonical(): string
    }

    export class Grapoi {
        addOut(term: NamedNode, value: string): Grapoi

        dataset: Dataset

        deleteOut(term: NamedNode, values: Array<string>): Grapoi

        out(term: NamedNode): Grapoi

        value: string
    }

    export function dataset(...args: Array<unknown>): Iterable<Quad>

    export module io {
        export module dataset {
            export function fromText(...args: Array<unknown>): Promise<unknown>

            export function fromURL(url: string, options?: unknown): Promise<grapoi>

            export function toText(format: string, dataset: unknown): Promise<string>

            export function toURL(url: string, dataset: unknown, options?: unknown): Promise<void>
        }
    }

    export function grapoi(...args: Array<unknown>): Grapoi

    export function literal(value: string): Literal

    export function namedNode(uri: string): NamedNode

    export function namespace(namespaceUri: string): Record<string, NamedNode>
}