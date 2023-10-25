import GuideLayout from "../guide-layout";
import {TYPESCRIPT_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import Types from "./2-types.mdx";
import Interfaces from "./3-interfaces.mdx";
import Outro from "./4-outro.mdx";

export default function TypeScriptGuide() {
    return (
        <GuideLayout guide={TYPESCRIPT_GUIDE}>
            <Intro/>
            <Types/>
            <Interfaces/>
            <Outro />
        </GuideLayout>
    )
}