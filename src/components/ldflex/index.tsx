import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import Models from "./3-contexts.mdx";
import LocalDemo from "./4-local-demo.mdx";
import SolidDemo from "./5-solid-demo.mdx";
import Review from "./6-review.mdx";
import {LIBRARY_LDFLEX} from "../../constants";
import LibraryLayout from "../library-layout";

export default function LDflex() {
    return (
        <LibraryLayout library={LIBRARY_LDFLEX}>
            <Intro/>
            <Install />
            <Models />
            <LocalDemo />
            <SolidDemo />
            <Review/>
        </LibraryLayout>
    )
}