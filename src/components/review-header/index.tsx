import Rating from "../rating";
import {NavLink} from "react-router-dom";
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
                            <NavLink to={`#${RATING_CRITERIA[index][0]}`}>
                                {RATING_CRITERIA[index][1]}
                            </NavLink>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="notification is-info is-light is-small">
                <strong>Disclaimer:</strong> This review is a personal assertion, and not in any way linked to the <a
                href="https://github.com/rdfjs">W3C RDF/JS CG</a>.
            </p>
        </>
    ) : null;
}