import Rating from "../rating";
import {NavLink} from "react-router-dom";
import {Library, RATING_CRITERIA} from "../../constants.ts";
import AuthorNote from "../author-note";

interface Props {
    library: Library;
}

export default function ReviewHeader({library}: Props) {
    return library.review?.length ? (
        <AuthorNote title={`My review of ${library.text}`}>
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
        </AuthorNote>
    ) : null;
}