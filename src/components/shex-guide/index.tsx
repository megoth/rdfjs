import GuideLayout from "../guide-layout";
import {SHEX_GUIDE} from "../../constants";
import Intro from "./1-intro.mdx";
import SimpleExample from "./2-simple-example.mdx";
import AdvancedExample from "./3-advanced-example.mdx";
import Outro from "./4-outro.mdx";

export default function ShExGuide() {
    return (
        <GuideLayout guide={SHEX_GUIDE}>
            <Intro />
            <SimpleExample />
            <AdvancedExample />
            <Outro />
        </GuideLayout>
    )
}