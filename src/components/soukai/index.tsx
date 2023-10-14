import SoukaiDemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";

export default function Soukai() {
    return (
        <>
            <h1 className="title">Soukai</h1>
            <SoukaiDemo/>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}