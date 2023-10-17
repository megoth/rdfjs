import {LibraryLink} from "../../constants.ts";
import styles from "./style.module.css";
import {clsx} from "clsx";

interface Props {
    library: LibraryLink
}

export default function LibraryHeader({library}: Props) {
    return (
        <>
            <article className={clsx("media", styles.media)}>
                <figure className="media-left">
                    <p className={clsx("image", styles.image)}>
                        <img src={library.icon} alt={library.iconAlt}/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <h1 className="title is-4">{library.name}</h1>
                        <p className="subtitle is-6">
                            <a href={library.websiteUrl}>{library.websiteName}</a>
                        </p>
                    </div>
                </div>
            </article>
        </>
    );
}