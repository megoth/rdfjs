import {Guide} from "../../constants";
import {ReactNode} from "react";
import GuideHeader from "../guide-header";
import RecommendationList from "../recommendation-list";
import GuideSection from "../guide-section";
import LibrarySection from "../library-section";

interface Props {
    children: ReactNode
    guide: Guide
    minimal?: boolean;
}

export default function GuideLayout({children, guide, minimal}: Props) {
    return <>
        <GuideHeader guide={guide}/>
        {children}
        {!minimal && <>
            <RecommendationList guide={guide}/>
            <GuideSection exclude={guide} title={"More guides"}/>
            <LibrarySection/>
        </>}
    </>;
}