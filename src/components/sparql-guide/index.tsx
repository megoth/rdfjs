import GuideLayout from "../guide-layout";
import {SPARQL_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import Read from "./2-read.mdx";
import Write from "./3-write.mdx";

export default function SPARQLGuide() {
    return (
        <GuideLayout guide={SPARQL_GUIDE}>
            <Intro />
            <Read />
            <Write />
        </GuideLayout>
    )
}