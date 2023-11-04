import GuideLayout from "../guide-layout";
import {REACT_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import Install from "./2-install.mdx";
import JSX from "./3-jsx.mdx";
import StateHandling from "./4-state-handling.mdx";
import Community from "./5-community.mdx";
import Alternatives from "./6-alternatives.mdx";

export default function ReactGuide() {
    return (
        <GuideLayout guide={REACT_GUIDE}>
            <Intro />
            <Install />
            <JSX />
            <StateHandling />
            <Community />
            <Alternatives />
        </GuideLayout>
    )
}