import LibraryHeader from "../library-header";
import {Library} from "../../constants";
import LibrarySection from "../library-section";
import GuideSection from "../guide-section";
import {ReactNode} from "react";

interface Props {
    library: Library;
    children: ReactNode;
}

export default function LibraryLayout({children, library}: Props) {
    return (
        <>
            <LibraryHeader library={library}/>
            {children}
            <LibrarySection exclude={library} title="Wanna check out the other libraries?"/>
            <GuideSection/>
        </>
    )
}