import {SERIALIZATIONS} from "../../constants.ts";
import Card from "../card";
import styles from "./styles.module.css";
import {clsx} from "clsx";

export default function SerializationList() {
    return (
        <ul className={clsx("columns", styles.columns)}>
            {SERIALIZATIONS.map(({name, logo, url}) => (
                <li key={logo} className="column">
                    <Card>
                        <a href={url} className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image">
                                        <img src={logo} alt={`Logo of $${name}`}/>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{name}</p>
                                </div>
                            </div>
                        </a>
                    </Card>
                </li>
            ))}
        </ul>
    );
}