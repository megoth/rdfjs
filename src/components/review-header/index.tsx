import Rating from "../rating";
import {StyledLink} from "rakkasjs";
import {Library, RATING_CRITERIA} from "../../constants.ts";

interface Props {
    library: Library;
}

export default function ReviewHeader({library}: Props) {
    return library.review?.length ? (
        <>
            <table className="table is-fullwidth is-striped">
                <tbody>
                {library.review.map((rating, index) => (
                    <tr key={`rating-${index}`}>
                        <td style={{width: 0}}>
                            <Rating rating={rating}/>
                        </td>
                        <td className="is-full">
                            <StyledLink href={`#${RATING_CRITERIA[index][0]}`}>
                                {RATING_CRITERIA[index][1]}
                            </StyledLink>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="message is-info is-small">
                <div className="message-body">
                    <strong>Disclaimer:</strong> This review is a personal assertion, and not in any way linked to
                    the <a href="https://github.com/rdfjs">W3C RDF/JS CG</a>.
                </div>
            </div>
        </>
    ) : null;
}