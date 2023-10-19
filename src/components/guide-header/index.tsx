import {Guide} from "../../constants.ts";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props {
    guide: Guide
}

export default function GuideHeader({guide}: Props) {
    return (
        <>
            <picture className={clsx("image", styles.image)}>
                <img src={guide.logo} alt={guide.logoAlt} style={{maxHeight: guide.logoPreferredHeight}}/>
            </picture>
            <header className="content">
                <h1 className="title">{guide.name}</h1>
            </header>
        </>
    );
}