import GuideLayout from "../guide-layout";
import {CRDT_GUIDE} from "../../constants";
import Intro from "./1-intro.mdx";
import RDF from "./2-rdf.mdx";
import Outro from "./3-outro.mdx";

export default function CRDTGuide() {
    return (
        <GuideLayout guide={CRDT_GUIDE}>
            <Intro />
            <RDF />
            <Outro />
        </GuideLayout>
    )
}