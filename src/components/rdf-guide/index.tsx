import Intro from "./1-intro.mdx";
import Vocabularies from "./2-vocabularies.mdx";
import Shapes from "./3-shapes.mdx";
import Querying from "./4-querying.mdx";
import BeyondRDF from "./5-beyond-rdf.mdx";
import {RDF_GUIDE} from "../../constants.ts";
import GuideLayout from "../guide-layout";

export default function RDFGuide() {
    return (
        <GuideLayout guide={RDF_GUIDE}>
            <Intro/>
            <Vocabularies />
            <Shapes />
            <Querying />
            <BeyondRDF/>
        </GuideLayout>
    )
}