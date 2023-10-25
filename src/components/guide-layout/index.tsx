import {Guide} from "../../constants.ts";
import {ReactNode} from "react";
import GuideHeader from "../guide-header";
import RecommendationList from "../recommendation-list";
import GuideSection from "../guide-section";
import LibrarySection from "../library-section";
import Container from "../container";

interface Props {
    children: ReactNode
    guide: Guide
    minimal?: boolean;
}

export default function GuideLayout({children, guide, minimal}: Props) {
    return <Container>
        <GuideHeader guide={guide}/>
        {children}
        {!minimal && <>
            <RecommendationList guide={guide}/>
            <GuideSection exclude={guide} title={"More guides"}/>
            <LibrarySection/>
        </>}
    </Container>;
}