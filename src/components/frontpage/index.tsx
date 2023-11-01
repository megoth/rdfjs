import Intro from "./1-intro.mdx";
import Guides from "./2-guides.mdx";
import Local from "./3-local.mdx";
import Solid from "./4-solid.mdx";
import Reviews from "./5.0-reviews.mdx";
import SolidWarning from "../solid-warning";
import DemoList from "../demo-list";
import {LOCAL_DEMOS, SOLID_DEMOS} from "../../constants.ts";
import Demo from "./6-demo.mdx";
import About from "./7-about.mdx";
import Content from "../content";
import { Head } from "rakkasjs";

export default function Frontpage() {
    return (
        <>
            <Intro/>
            <Guides/>
            <Local/>
            <DemoList list={LOCAL_DEMOS}/>
            <Content>
                <p>Note that each demo has its own storage, so none of the local demos "bleed" into each other.</p>
            </Content>
            <Solid/>
            <SolidWarning/>
            <DemoList list={SOLID_DEMOS}/>
            <Reviews/>
            <Demo/>
            <About/>
        </>
    );
}