import {Literal, NamedNode, Term} from "@rdfjs/types";

function equals(a: Term, b: Term | null | undefined): boolean {
    return a.termType === b?.termType && a.value === b?.value;
}

export function createNamedNode(value: string): NamedNode {
    return {
        termType: "NamedNode",
        value,
        equals(other: Term | null | undefined): boolean {
            return equals(this, other);
        }
    }
}

interface LiteralOptions {
    language?: string
    datatype?: NamedNode
}

export function createLiteral(value: string, options: LiteralOptions = {}): Literal {
    return {
        termType: "Literal",
        value,
        language: options.language || "en-US",
        datatype: options.datatype || createNamedNode("http://www.w3.org/2001/XMLSchema#string"),
        equals(other: Term | null | undefined): boolean {
            return equals(this, other);
        }
    }

}