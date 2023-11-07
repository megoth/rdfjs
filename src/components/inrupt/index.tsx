import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import LocalDemo from "./3-local-demo.mdx";
import SolidDemo from "./4-solid-demo.mdx";
import AuthDemo from "./5-auth-demo.mdx";
import Review from "./6-review.mdx";
import Bias from "./7-bias.mdx";
import {LIBRARY_INRUPT} from "../../constants";
import LibraryLayout from "../library-layout";

export default function Inrupt() {
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <Intro/>
            <Install />
            <LocalDemo/>
            <SolidDemo/>
            <AuthDemo />
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}