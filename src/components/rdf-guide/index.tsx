import Intro from "./1-intro.mdx";
import BeyondRDF from "./2-beyond-rdf.mdx";
import {RDF_GUIDE} from "../../constants.ts";
import GuideLayout from "../guide-layout";

export default function RDFGuide() {
    return (
        <GuideLayout guide={RDF_GUIDE}>
            <Intro/>
            <BeyondRDF/>
        </GuideLayout>
    )
}