import {StyledLink} from "rakkasjs";
import {clsx} from "clsx";
import {useState} from "react";
import styles from "./style.module.css";
import {LIBRARIES} from "../../constants.ts";

export default function Navigation() {
    const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <StyledLink href={"/"} className={clsx("navbar-item", styles.homeLink)}
                                onClick={() => setMenuIsActive(false)}>
                        <img src="/rdfjs.png" alt="Logo for rdf.js.org"/>
                        <span>Home</span>
                    </StyledLink>
                    <button className={clsx("navbar-burger", {
                        "is-active": menuIsActive
                    })} aria-label="menu" aria-expanded="false" type="button"
                            onClick={() => setMenuIsActive(!menuIsActive)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className={clsx("navbar-menu", {
                    "is-active": menuIsActive
                })}>
                    <div className="navbar-start">
                        {LIBRARIES.map(({href, name}) => (
                            <StyledLink href={href} key={href} className="navbar-item"
                                        onClick={() => setMenuIsActive(false)}>
                                {name}
                            </StyledLink>)
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}