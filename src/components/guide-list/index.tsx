import {Guide, GUIDES} from "../../constants";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import {useMemo} from "react";
import Card from "../card";
import Columns from "../columns";
import Image from "../image";

export interface Props {
    exclude?: Guide
}

export default function GuideList({exclude}: Props) {
    const guides = useMemo(() => exclude
            ? GUIDES.filter((guide) => guide !== exclude)
            : GUIDES,
        [exclude])
    return (
        <Columns>
            {guides.map(({href, logo, logoAlt, name}) => (
                <NavLink key={href} to={href}>
                    <Card>
                        <div className="card-content">
                            <div className={clsx("media", styles.media)}>
                                <div className="media-left">
                                    <Image>
                                        <img src={logo} alt={logoAlt} />
                                    </Image>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{name}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </NavLink>
            ))}
        </Columns>
    )
}