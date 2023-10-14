import RdflibDemo from "./demo";
import demoCode from "./demo/index.tsx?raw";
import Code from "../code";

export default function Rdflib() {
    return (
        <>
            <h1 className="title">rdflib.js</h1>
            <RdflibDemo />
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}