import Login from "../login";
import InruptDemo from "./demo";
import {useSolidAuth} from "@ldo/solid-react";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import usePrism from "../../hooks/use-prism";
import LogoutButton from "../logout-button";
import Review from "./review.mdx";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    usePrism();

    return (
        <>
            <h1 className="title">Inrupt's JavaScript client libraries</h1>
            <Content><IntroSection/></Content>
            <div id="solid">
                <Code language={"tsx"} id="InruptSolidDemo" code={demoCode}>
                    <h2 className="subtitle is-3">Solid demo</h2>
                    {session.isLoggedIn ? <>
                        <InruptDemo/>
                        <LogoutButton/>
                    </> : <Login login={login}/>}
                    <Content><CodeSection/></Content>
                </Code>
            </div>
            <Review/>
        </>
    )
}