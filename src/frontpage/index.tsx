import Intro from "./intro.mdx";
import SolidIntro from "./solidIntro.mdx";
import Content from "../content";
import SolidWarning from "../solid-warning";

export default function Frontpage() {
    return (
        <Content>
            <Intro/>
            <SolidIntro/>
            <SolidWarning/>
        </Content>
    );
}