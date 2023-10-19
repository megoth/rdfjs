import Intro from "./1-intro.mdx";
import BeyondRDF from "./2-beyond-rdf.mdx";
import Resources from "./3-resources.mdx";
import GuideSection from "../guide-section";
import {RDF_GUIDE} from "../../constants.ts";
import RecommendationList from "../recommendation-list";

export default function RDFGuide() {
    return (
        <>
            <Intro/>
            <BeyondRDF/>
            <GuideSection exclude={RDF_GUIDE} />
            <RecommendationList guide={RDF_GUIDE} />
            <Resources />
        </>
    )
}