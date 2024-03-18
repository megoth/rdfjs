import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SparqlDemo from "./4-sparql-demo.mdx";
import SolidDemo from "./5-solid-demo.mdx";
import Review from "./6-review.mdx";
import {LIBRARY_QUADSTORE} from "../../constants";
import LibraryLayout from "../library-layout";

export default function Quadstore() {
    return (
        <LibraryLayout library={LIBRARY_QUADSTORE}>
            <Intro/>
            <Install />
            <LocalDemo />
            <SparqlDemo />
            <SolidDemo />
            <Review/>
        </LibraryLayout>
    )
}