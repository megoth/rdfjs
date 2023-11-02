import Intro from "./1-intro.mdx";
import LocalDemo from "./2-local-demo.mdx";
import SolidDemo from "./3-solid-demo.mdx";
import Review from "./4-review.mdx";
import Literals from "./5-literals.mdx";
import Bias from "./6-bias.mdx";
import {LIBRARY_INRUPT} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Inrupt() {
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <Intro/>
            <LocalDemo/>
            <SolidDemo/>
            <Literals/>
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}