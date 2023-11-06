import {Guide} from "../../constants";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props {
    guide: Guide
}

export default function GuideHeader({guide}: Props) {
    return <>
        <picture className={clsx("image", styles.image)}>
            <img src={guide.logo} alt={guide.logoAlt} style={{maxHeight: guide.logoPreferredHeight}}/>
        </picture>
        <h1 className={clsx("title", styles.title)}>{guide.name}</h1>
    </>;
}