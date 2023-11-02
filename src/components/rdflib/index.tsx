import IntroSection from "./1-intro.mdx";
import LocalDemo from "./2-local-demo.mdx";
import SolidDemo from "./3-solid-demo.mdx";
import Review from "./4-review.mdx";
import React from "./5-react.mdx";
import Bias from "./6-bias.mdx";
import {LIBRARY_RDFLIB} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Rdflib() {
    return (
        <LibraryLayout library={LIBRARY_RDFLIB}>
            <IntroSection/>
            <LocalDemo />
            <SolidDemo />
            <React/>
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}