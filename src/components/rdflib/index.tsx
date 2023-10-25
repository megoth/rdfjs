import RdflibLocalDemo from "./local-demo";
import storeHookCode from "./store-hook.ts?raw";
import Code from "../code";
import IntroSection from "./intro.mdx";
import LocalDemoCodeSection from "./local-demo/code.mdx";
import SolidDemoCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import RdflibSolidDemo from "./solid-demo";
import Review from "./review.mdx";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import {LIBRARY_RDFLIB} from "../../constants.ts";
import CodeLink from "../code-link";
import LibraryLayout from "../library-layout";
import Container from "../container";
import Hero from "../hero";

export default function Rdflib() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_RDFLIB}>
            <Container>
                <IntroSection/>
                <Content id="local"><h2 className="subtitle is-3">Local demo</h2></Content>
            </Container>
            <Hero>
                <RdflibLocalDemo/>
            </Hero>
            <Container>
                <LocalDemoCodeSection/>
                <Content id="solid"><h2 className="subtitle is-3">Solid demo</h2></Content>
                {session.isLoggedIn && <LogoutButton/>}
            </Container>
            <Hero>
                {session.isLoggedIn
                    ? <RdflibSolidDemo/>
                    : <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
            </Hero>
            <Container>
                <SolidDemoCodeSection/>
                <Review/>
                <Content>
                    <h2 className="subtitle">Tips on React</h2>

                    If you're going to use rdflib.js with React, I would encourage you to use this hook:
                </Content>
                <Code code={storeHookCode} id="StoreHook" language="typescript" className="line-numbers"/>
                <Content>It should allow you to easily access a global store. (It is basically the same code used in
                    the <CodeLink id="RdflibSolidDemo" lines={["8", "11-13"]}>Solid demo</CodeLink>.)</Content>
            </Container>
        </LibraryLayout>
    )
}