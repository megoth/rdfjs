import GuideLayout from "../guide-layout";
import {REACT_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import JSX from "./2-jsx.mdx";
import StateHandling from "./3-state-handling.mdx";
import Community from "./4-community.mdx";
import Alternatives from "./5-alternatives.mdx";

export default function ReactGuide() {
    return (
        <GuideLayout guide={REACT_GUIDE}>
            <Intro />
            <JSX />
            <StateHandling />
            <Community />
            <Alternatives />
        </GuideLayout>
    )
}