import {LibraryLink} from "../../constants.ts";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props {
    library: LibraryLink
}

export default function LibraryHeader({library}: Props) {
    return (
        <>
            <picture className={clsx("image", styles.image)}>
                <img src={library.icon} alt={library.iconAlt} style={{maxHeight: library.iconPreferredHeight}}/>
            </picture>
            <header className="content">
                <h1 className="title">{library.name}</h1>
                <ul className={styles.libraryInfo}>
                    <li>Project page: <a href={library.websiteUrl}>{library.websiteName}</a></li>
                    <li>Created by <a href={library.creatorUrl}>{library.creator}</a></li>
                </ul>
            </header>
        </>
    );
}