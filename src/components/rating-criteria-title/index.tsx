import {RATING_CRITERIA, RatingScore} from "../../constants";
import Rating from "../rating";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props {
    index: 0 | 1 | 2 | 3 | 4;
    rating?: RatingScore
}

export default function RatingCriteriaTitle({index, rating}: Props) {
    return (
        <h2 className={clsx("subtitle is-5", styles.subtitle)}>
            <span className={styles.subtitleText}>{RATING_CRITERIA[index][1]}</span>
            <Rating className={styles.rating} rating={rating}/>
        </h2>
    )
}