import Intro from "./1-intro.mdx";
import BeyondRDF from "./2-beyond-rdf.mdx";
import GuideSection from "../guide-section";
import {RDF_GUIDE} from "../../constants.ts";
import RecommendationList from "../recommendation-list";
import LibrarySection from "../library-section";

export default function RDFGuide() {
    return (
        <>
            <Intro/>
            <BeyondRDF/>
            <GuideSection exclude={RDF_GUIDE} />
            <RecommendationList guide={RDF_GUIDE} />
            <LibrarySection />
        </>
    )
}