import {Demo} from "../../constants";
import styles from "./style.module.css";
import {clsx} from "clsx";
import {NavLink} from "react-router-dom";
import Card from "../card";
import Columns from "../columns";

interface Props {
    list: Array<Demo>
}

export default function DemoList({list}: Props) {
    const demoList = list.filter(({library}) => library.published);
    return (
        <Columns>
            {demoList.map(({
                               title,
                               subtitle,
                               href,
                               library,
                               icon,
                               iconAlt,
                               slogan
                           }) => (
                <NavLink to={href} key={href}>
                    <Card>
                        <div className={clsx("card-content", styles.cardContent)}>
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image">
                                        <img src={icon || library.icon} alt={iconAlt || library.iconAlt}/>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{title}</p>
                                    {subtitle && <p className="subtitle is-6">{subtitle}</p>}
                                </div>
                            </div>
                            <div className="content">{slogan}</div>
                        </div>
                        <div className="card-footer">
                            <div className={clsx("card-footer-item button is-info", styles.link)}>
                                Check out demo
                            </div>
                        </div>
                    </Card>
                </NavLink>
            ))}
        </Columns>
    )
}