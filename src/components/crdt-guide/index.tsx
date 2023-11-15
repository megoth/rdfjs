import GuideLayout from "../guide-layout";
import {CRDT_GUIDE} from "../../constants";
import Intro from "./1-intro.mdx";

export default function CRDTGuide() {
    return (
        <GuideLayout guide={CRDT_GUIDE}>
            <Intro />
        </GuideLayout>
    )
}