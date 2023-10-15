import Navigation from "../navigation";
import {Outlet, useLocation} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";
import {useLayoutEffect} from "react";

export default function Layout() {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="container">
            <Navigation/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
        </div>
    )
}