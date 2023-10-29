import Intro from "./1-intro.mdx";
import Serializations from "./2-serializations.mdx";
import Vocabularies from "./3-vocabularies.mdx";
import Shapes from "./4-shapes.mdx";
import Querying from "./5-querying.mdx";
import BeyondRDF from "./6-beyond-rdf.mdx";
import {RDF_GUIDE} from "../../constants.ts";
import GuideLayout from "../guide-layout";

export default function RDFGuide() {
    return (
        <GuideLayout guide={RDF_GUIDE}>
            <Intro/>
            <Serializations />
            <Vocabularies />
            <Shapes />
            <Querying />
            <BeyondRDF/>
        </GuideLayout>
    )
}