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
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
            <ScrollRestoration/>
        </div>
    )
}