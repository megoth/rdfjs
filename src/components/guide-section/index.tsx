import Content from "../content";
import GuideList, {Props as GuideListProps} from "../guide-list";

interface Props extends GuideListProps {
}

export default function GuideSection({exclude}: Props) {
    return (
        <>
            <Content>
                <h2 className="subtitle">More guides</h2>

                If you want to learn more about semantic technologies that are relevant for the demos used on this
                website, check out these other guides.
            </Content>

            <GuideList exclude={exclude}/>
        </>
    )
}