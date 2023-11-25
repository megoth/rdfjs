import namespace from '@rdfjs/namespace'
import {prefixes} from '@zazuko/rdf-vocabularies'
import {NamedNode} from "@rdfjs/types";

export const FOAF = namespace(prefixes.foaf) as Record<string, NamedNode>;