import Intro from "./1-intro.mdx";
import Solid from "./2-solid.mdx";
import Reviews from "./3-reviews.mdx";
import Content from "../content";
import SolidWarning from "../solid-warning";

export default function Frontpage() {
    return (
        <>
            <Content>
                <Intro/>
                <Solid/>
                <SolidWarning/>
            </Content>
            <Reviews/>
        </>
    );
}