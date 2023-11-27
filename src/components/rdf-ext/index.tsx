import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SolidDemo from "./4-solid-demo.mdx";
import TypeScriptSupport from "./5-typescript-support.mdx";
import Review from "./6-review.mdx";
import {LIBRARY_RDF_EXT} from "../../constants";
import LibraryLayout from "../library-layout";

export default function RdfExt() {
    return (
        <LibraryLayout library={LIBRARY_RDF_EXT}>
            <Intro/>
            <Install />
            <LocalDemo/>
            <SolidDemo/>
            <TypeScriptSupport />
            <Review/>
        </LibraryLayout>
    )
}