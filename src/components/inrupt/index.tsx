import Intro from "./1-intro.mdx";
import Review from "./2-review.mdx";
import Bias from "./3-bias.mdx";
import LocalDemoCode from "./local-demo/code.mdx";
import SolidDemoCode from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import {LIBRARY_INRUPT} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import LoginGate from "../login-gate";
import {lazy} from "react";
import {ClientSuspense} from "rakkasjs";

const LDOLocalDemoComponent = lazy(() => import("./local-demo"));
const LDOSolidDemoComponent = lazy(() => import("./solid-demo"));

export default function Inrupt() {
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <Intro/>
            <Content id="local">
                <h2 className="subtitle is-3">Local demo</h2>
            </Content>
            <ClientSuspense fallback={"Loading demo..."}>
                {<LDOLocalDemoComponent/>}
            </ClientSuspense>
            <LocalDemoCode/>
            <Content id="solid">
                <h2 className="subtitle is-3">Solid demo</h2>
            </Content>
            <LoginGate redirectId="solid-react">
                <ClientSuspense fallback={"Loading demo..."}>
                    {<LDOSolidDemoComponent/>}
                </ClientSuspense>
                <LogoutButton/>
            </LoginGate>
            <SolidDemoCode/>
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}