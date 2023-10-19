import {Guide} from "../../constants.ts";
import Content from "../content";
import {AiFillYoutube, AiOutlineLink} from "react-icons/ai";

interface Props {
    guide: Guide
}

export default function RecommendationList({guide}: Props) {
    return (
        <>
            <Content id="recommendations">
                <h2 className="subtitle">Recommended reading/watching</h2>

                For more reading on this topic, I recommend checking out these resources.
            </Content>

            <table className={"table is-striped is-fullwidth"}>
                <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                {guide.recommendations.map(({href, note, title, type}) => (
                    <tr>
                        <td>
                            {type === "URL" && <AiOutlineLink/>}
                            {type === "YouTube" && <AiFillYoutube/>}
                        </td>
                        <td>
                            <a href={href}>{title}</a>
                        </td>
                        <td>{note}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}