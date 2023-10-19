import {Guide} from "../../constants.ts";
import Content from "../content";
import {AiFillYoutube, AiOutlineLink} from "react-icons/ai";

interface Props {
    guide: Guide
}

export default function RecommendationList({guide}: Props) {
    return (
        <>
            <Content>
                <h2 className="subtitle">Recommended reading/watching</h2>

                For more reading on this topic, I can recommend you to check out these resources.
            </Content>

            <table className={"table is-striped"}>
                <tbody>
                {guide.recommendations.map(({href, title, type}) => (
                    <tr>
                        <td>
                            {type === "URL" && <AiOutlineLink/>}
                            {type === "YouTube" && <AiFillYoutube/>}
                        </td>
                        <td>
                            <a href={href}>{title}</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}