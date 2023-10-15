import {DemoLink} from "../../constants.ts";
import styles from "./style.module.css";
import {clsx} from "clsx";
import {NavLink} from "react-router-dom";

interface Props {
    list: Array<DemoLink>
}

export default function DemoList({list}: Props) {
    return (
        <div className={styles.demoList}>
            <ul className={clsx("columns", styles.columns)}>
                {list.map(({title, subtitle, href, icon, slogan}) => (
                    <div className="column">
                        <div className={clsx("card", styles.card)}>
                            <div className={clsx("card-content", styles.cardContent)}>
                                <div className={clsx("media", styles.media)}>
                                    <div className={clsx("media-left", styles.mediaLeft)}>
                                        <figure className={clsx("image", styles.image)}>
                                            <img src={icon} alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{title}</p>
                                        {subtitle && <p className="subtitle is-6">{subtitle}</p>}
                                    </div>
                                </div>
                                <div className="content">{slogan}</div>
                            </div>
                            <footer className="card-footer">
                                <NavLink to={href} className={clsx("card-footer-item button is-info", styles.link)}>
                                    Check out demo
                                </NavLink>
                            </footer>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}