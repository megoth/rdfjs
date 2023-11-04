import Intro from "./1-intro.mdx";
import Models from "./2-models.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SolidDemo from "./4-solid-demo.mdx";
import Review from "./5-review.mdx";
import {LIBRARY_SOUKAI} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Soukai() {
    return (
        <LibraryLayout library={LIBRARY_SOUKAI}>
            <Intro/>
            <Models />
            <LocalDemo />
            <SolidDemo />
            <Review/>
        </LibraryLayout>
    )
}