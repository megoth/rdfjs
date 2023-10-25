import LibraryHeader from "../library-header";
import {Library} from "../../constants.ts";
import LibrarySection from "../library-section";
import GuideSection from "../guide-section";
import {ReactNode} from "react";
import Container from "../container";

interface Props {
    library: Library;
    children: ReactNode;
}

export default function LibraryLayout({children, library}: Props) {
    return (
        <>
            <Container>
                <LibraryHeader library={library}/>
            </Container>
            {children}
            <Container>
                <LibrarySection exclude={library} title="Wanna check out the other libraries?"/>
                <GuideSection/>
            </Container>
        </>
    )
}