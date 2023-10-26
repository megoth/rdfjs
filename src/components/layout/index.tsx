import Navigation from "../navigation";
import {Outlet, ScrollRestoration, useHref, useLocation, useNavigate} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";
import {parseSearch, serializeSearch} from "../../libs/location.ts";
import {useEffect} from "react";

export default function Layout() {
    const routerLocation = useLocation();
    const href = useHref(routerLocation.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        const {redirectId, ...queries} = parseSearch(location.search);
        if (!redirectId) return;
        const url = href + serializeSearch(queries) + "#" + redirectId;
        navigate(url);
    }, [href, navigate]);
    return (
        <div className="container">
            <Navigation/>
            <main className={styles.main}>
                <div className="message is-info is-small">
                    <div className="message-body">
                        This website is currently being reviewed for quality control. If you have any feedback on this
                        website that you want to share with me, I would appreciate it if you send me a message (on a
                        channel you know me) or create an issue on the <a
                        href="https://github.com/megoth/rdfjs/issues">website's project page</a>.
                    </div>
                </div>
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
            <ScrollRestoration/>
        </div>
    )
}