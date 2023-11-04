import Intro from "./1-intro.mdx";
import SolidDemo from "./2-solid-demo.mdx";
import SPARQLBuilderDemo from "./3-sparql-builder-demo.mdx";
import RDFSPARQLBuilderDemo from "./4-rdf-sparql-builder-demo.mdx";
import Review from "./5-review.mdx";
import {LIBRARY_COMUNICA} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Comunica() {
    return (
        <LibraryLayout library={LIBRARY_COMUNICA}>
            <Intro/>
            <SolidDemo />
            <SPARQLBuilderDemo />
            <RDFSPARQLBuilderDemo />
            <Review/>
        </LibraryLayout>
    )
}