import {Demo} from "../../constants";
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
            {demoList.map(({title, subtitle, href, icon, iconAlt, slogan}) => (
                <NavLink to={href} key={href}>
                    <Card>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image">
                                        <img src={icon} alt={iconAlt}/>
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
                            <div className="card-footer-item button is-info">
                                Check out demo
                            </div>
                        </div>
                    </Card>
                </NavLink>
            ))}
        </Columns>
    )
}