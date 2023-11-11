import {SERIALIZATIONS} from "../../constants";
import Card from "../card";
import Columns from "../columns";
import Image from "../image";

export default function SerializationList() {
    return (
        <Columns>
            {SERIALIZATIONS.map(({name, logo, url}) => (
                <li key={logo}>
                    <Card>
                        <a href={url} className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <Image>
                                        <img src={logo} alt={`Logo of $${name}`}/>
                                    </Image>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{name}</p>
                                </div>
                            </div>
                        </a>
                    </Card>
                </li>
            ))}
        </Columns>
    );
}