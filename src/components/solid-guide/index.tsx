import GuideLayout from "../guide-layout";
import {SOLID_GUIDE} from "../../constants.ts";
import Intro from "./1-intro.mdx";
import Authentication from "./2-authentication.mdx";
import Authorization from "./3-authorization.mdx";
import LinkedData from "./4-linked-data.mdx";
import Apps from "./5-apps.mdx";

export default function SolidGuide() {
    return (
        <GuideLayout guide={SOLID_GUIDE} minimal={true}>
            <Intro/>
            <Authentication/>
            <Authorization/>
            <LinkedData/>
            <Apps />
        </GuideLayout>
    )
}