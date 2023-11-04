import Intro from "./1-intro.mdx";
import LocalDemo from "./2-local-demo.mdx";
import SolidDemo from "./3-solid-demo.mdx";
import Review from "./4-review.mdx";
import Bias from "./5-bias.mdx";
import {LIBRARY_INRUPT} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Inrupt() {
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <Intro/>
            <LocalDemo/>
            <SolidDemo/>
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}