import GuideLayout from "../guide-layout";
import {BUSINESS_GUIDE} from "../../constants";
import Intro from "./1-intro.mdx";
import UseCases from "./2-use-cases.mdx";
import Outro from "./3-outro.mdx";

export default function BusinessGuide() {
    return (
        <GuideLayout guide={BUSINESS_GUIDE}>
            <Intro/>
            <UseCases/>
            <Outro/>
        </GuideLayout>
    )
}