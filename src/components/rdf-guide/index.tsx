import Intro from "./1-intro.mdx";
import Interoperability from "./2-interoperability.mdx";
import Serializations from "./3-serializations.mdx";
import Vocabularies from "./4-vocabularies.mdx";
import Shapes from "./5-shapes.mdx";
import Querying from "./6-querying.mdx";
import BeyondRDF from "./7-beyond-rdf.mdx";
import {RDF_GUIDE} from "../../constants";
import GuideLayout from "../guide-layout";

export default function RDFGuide() {
    return (
        <GuideLayout guide={RDF_GUIDE}>
            <Intro/>
            <Interoperability />
            <Serializations />
            <Vocabularies />
            <Shapes />
            <Querying />
            <BeyondRDF/>
        </GuideLayout>
    )
}