import SoukaiDemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";

export default function Soukai() {
    return (
        <>
            <h1 className="title">Soukai</h1>
            <Content><IntroSection/></Content>
            <SoukaiDemo/>
            <Content><CodeSection/></Content>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}