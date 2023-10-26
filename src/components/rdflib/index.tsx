import RdflibLocalDemo from "./local-demo";
import LocalDemoCodeSection from "./local-demo/code.mdx";
import SolidDemoCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import RdflibSolidDemo from "./solid-demo";
import IntroSection from "./1-intro.mdx";
import Review from "./2-review.mdx";
import React from "./3-react.mdx";
import Bias from "./4-bias.mdx";
import LogoutButton from "../logout-button";
import {LIBRARY_RDFLIB} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import LoginGate from "../login-gate";

export default function Rdflib() {
    return (
        <LibraryLayout library={LIBRARY_RDFLIB}>
            <IntroSection/>
            <Content id="local">
                <h2 className="subtitle is-3">Local demo</h2>
            </Content>
            <RdflibLocalDemo/>
            <LocalDemoCodeSection/>
            <Content id="solid">
                <h2 className="subtitle is-3">Solid demo</h2>
            </Content>
            <LoginGate redirectId="solid">
                <RdflibSolidDemo/>
                <LogoutButton/>
            </LoginGate>
            <SolidDemoCodeSection/>
            <React/>
            <Review/>
            <Bias/>
        </LibraryLayout>
    )
}