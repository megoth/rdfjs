import RdflibDemo from "./demo";
import demoCode from "./demo/index.tsx?raw";
import Code from "../code";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";

export default function Rdflib() {
    return (
        <>
            <h1 className="title">rdflib.js</h1>
            <Content><IntroSection/></Content>
            <RdflibDemo/>
            <Content><CodeSection/></Content>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}