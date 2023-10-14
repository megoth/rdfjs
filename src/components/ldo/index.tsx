import LDODemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";

export default function LDO() {
    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            <LDODemo/>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}