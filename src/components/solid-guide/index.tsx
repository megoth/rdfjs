import GuideLayout from "../guide-layout";
import {SOLID_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import Authentication from "./2-authentication.mdx";
import Authorization from "./3-authorization.mdx";
import RDF from "./4-rdf.mdx";
import Apps from "./5-apps.mdx";

export default function SolidGuide() {
    return (
        <GuideLayout guide={SOLID_GUIDE}>
            <Intro/>
            <Authentication/>
            <Authorization/>
            <RDF/>
            <Apps />
        </GuideLayout>
    )
}