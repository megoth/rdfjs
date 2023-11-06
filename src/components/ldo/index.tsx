import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import Shapes from "./3-shapes.mdx";
import LocalDemo from "./4-local-demo.mdx";
import SolidDemo from "./5-solid-demo.mdx";
import Review from "./6-review.mdx";
import Bias from "./7-bias.mdx";
import {LIBRARY_LDO} from "../../constants";
import LibraryLayout from "../library-layout";

export default function LDO() {
    return (
        <LibraryLayout library={LIBRARY_LDO}>
            <Intro/>
            <Install />
            <Shapes/>
            <LocalDemo />
            <SolidDemo />
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}