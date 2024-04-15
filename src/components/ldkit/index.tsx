import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import Models from "./3-models.mdx";
import LocalDemo from "./4-local-demo.mdx";
import SolidDemo from "./5-solid-demo.mdx";
import Review from "./6-review.mdx";
import {LIBRARY_LDKIT} from "../../constants";
import LibraryLayout from "../library-layout";

export default function LDkit() {
    return (
        <LibraryLayout library={LIBRARY_LDKIT}>
            <Intro/>
            <Install />
            <Models />
            <LocalDemo />
            <SolidDemo />
            <Review/>
        </LibraryLayout>
    )
}