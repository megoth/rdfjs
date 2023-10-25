import Login from "../login";
import InruptLocalDemo from "./local-demo";
import InruptSolidDemo from "./solid-demo";
import {useSolidAuth} from "@ldo/solid-react";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Review from "./review.mdx";
import {LIBRARY_INRUPT} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import Container from "../container";
import Hero from "../hero";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <Container>
                <IntroSection/>
                <Content id="local"><h2 className="subtitle is-3">Local demo</h2></Content>
            </Container>
            <Hero>
                <InruptLocalDemo/>
            </Hero>
            <Container>
                <LocalCodeSection/>
                <Content id="solid"><h2 className="subtitle is-3">Solid demo</h2></Content>
                {session.isLoggedIn && <LogoutButton/>}
            </Container>
            <Hero>
                {session.isLoggedIn ? <InruptSolidDemo/> : <Login login={login}/>}
            </Hero>
            <Container>
                <SolidCodeSection/>
                <Review/>
            </Container>
        </LibraryLayout>
    )
}