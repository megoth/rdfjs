import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import SolidDemo from "./3-solid-demo.mdx";
import SPARQLBuilderDemo from "./4-sparql-builder-demo.mdx";
import RDFSPARQLBuilderDemo from "./5-rdf-sparql-builder-demo.mdx";
import Review from "./6-review.mdx";
import {LIBRARY_COMUNICA} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Comunica() {
    return (
        <LibraryLayout library={LIBRARY_COMUNICA}>
            <Intro/>
            <Install />
            <SolidDemo />
            <SPARQLBuilderDemo />
            <RDFSPARQLBuilderDemo />
            <Review/>
        </LibraryLayout>
    )
}