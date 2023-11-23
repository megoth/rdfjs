import Intro from "./1-intro.mdx";
import Guides from "./2-guides.mdx";
import Local from "./3-local.mdx";
import P2P from "./4-p2p.mdx";
import Solid from "./5-solid.mdx";
import Reviews from "./6-reviews.mdx";
import Demo from "./7-demo.mdx";
import About from "./8-about.mdx";

export default function Frontpage() {
    return <>
        <Intro/>
        <Guides/>
        <Local/>
        <P2P/>
        <Solid/>
        <Reviews/>
        <Demo/>
        <About/>
    </>;
}