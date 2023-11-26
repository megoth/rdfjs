import {Demo} from "../../constants";
import styles from "./style.module.css";
import {clsx} from "clsx";
import {NavLink} from "react-router-dom";
import Card from "../card";
import Columns from "../columns";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    list: Array<Demo>
}

export default function DemoList({list, ...props}: Props) {
    return (
        <Columns {...props}>
            {list.map(({
                           title,
                           subtitle,
                           href,
                           library,
                           icon,
                           iconAlt,
                           slogan
                       }) => (
                <NavLink to={href} key={href} data-test="Demo">
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
                            <div className="content" dangerouslySetInnerHTML={{__html: slogan}}/>
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