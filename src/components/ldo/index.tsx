import LDODemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";

export default function LDO() {
    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            <Content><IntroSection/></Content>
            <LDODemo/>
            <Content><CodeSection/></Content>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}