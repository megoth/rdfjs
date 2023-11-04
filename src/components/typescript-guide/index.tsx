import GuideLayout from "../guide-layout";
import {TYPESCRIPT_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import Types from "./3-types.mdx";
import Interfaces from "./4-interfaces.mdx";
import Outro from "./5-outro.mdx";

export default function TypeScriptGuide() {
    return (
        <GuideLayout guide={TYPESCRIPT_GUIDE}>
            <Intro/>
            <Install />
            <Types/>
            <Interfaces/>
            <Outro />
        </GuideLayout>
    )
}