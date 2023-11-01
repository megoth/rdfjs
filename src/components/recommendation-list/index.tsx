import {Guide} from "../../constants.ts";
import Content from "../content";
import {ClientSuspense} from "rakkasjs";
import {lazy} from "react";

interface Props {
    guide: Guide
}

const UrlIcon = lazy(() => import("./url-icon"));
const YouTubeIcon = lazy(() => import("./youtube-icon"));

export default function RecommendationList({guide}: Props) {
    return guide.recommendations.length ? (
        <>
            <Content id="recommendations">
                <h2 className="subtitle">Recommended resources</h2>

                For more insights into {guide.name}, I recommend checking out these resources.
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
                    <tr key={href}>
                        <td>
                            {type === "URL" && <ClientSuspense fallback>{<UrlIcon />}</ClientSuspense>}
                            {type === "YouTube" && <ClientSuspense fallback>{<YouTubeIcon style={{fill: "red"}}/>}</ClientSuspense>}
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
    ) : null;
}