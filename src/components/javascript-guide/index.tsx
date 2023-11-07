import GuideLayout from "../guide-layout";
import {JAVASCRIPT_GUIDE} from "../../constants";
import Intro from "./1-intro.mdx";
import Basics from "./2-basics.mdx";
import Controls from "./3-controls.mdx";
import Functions from "./4-functions.mdx";
import Classes from "./5-classes.mdx";
import Modules from "./6-modules.mdx";
import WebAPIs from "./7-web-apis.mdx";
import AsynchronousCode from "./8-asynchronous-code.mdx";
import Outro from "./9-outro.mdx";

export default function JavascriptGuide() {
    return (
        <GuideLayout guide={JAVASCRIPT_GUIDE}>
            <Intro />
            <Basics />
            <Controls />
            <Functions />
            <Classes />
            <Modules />
            <WebAPIs />
            <AsynchronousCode />
            <Outro />
        </GuideLayout>
    )
}