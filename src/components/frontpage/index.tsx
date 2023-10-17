import Intro from "./1-intro.mdx";
import Local from "./2-local.mdx";
import Solid from "./3-solid.mdx";
import Reviews from "./4.0-reviews.mdx";
import SolidWarning from "../solid-warning";
import DemoList from "../demo-list";
import {LOCAL_DEMOS, SOLID_DEMOS} from "../../constants.ts";
import Demo from "./5-demo.mdx";
import About from "./6-about.mdx";

export default function Frontpage() {
    return (
        <>
            <Intro/>
            <Local/>
            <DemoList list={LOCAL_DEMOS}/>
            <Solid/>
            <SolidWarning/>
            <DemoList list={SOLID_DEMOS}/>
            <Reviews/>
            <Demo/>
            <About/>
        </>
    );
}