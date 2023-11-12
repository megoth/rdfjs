import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SolidDemo from "./4-solid-demo.mdx";
import Review from "./5-review.mdx";
import {LIBRARY_M_LD} from "../../constants";
import LibraryLayout from "../library-layout";

export default function MLd() {
    return (
        <LibraryLayout library={LIBRARY_M_LD}>
            <Intro/>
            <Install />
            <LocalDemo/>
            <SolidDemo/>
            <Review/>
        </LibraryLayout>
    )
}