import Intro from "./1-intro.mdx";
import Shapes from "./2-shapes.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SolidDemo from "./4-solid-demo.mdx";
import Review from "./5-review.mdx";
import Bias from "./6-bias.mdx";
import {LIBRARY_LDO} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function LDO() {
    return (
        <LibraryLayout library={LIBRARY_LDO}>
            <Intro/>
            <Shapes/>
            <LocalDemo />
            <SolidDemo />
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}