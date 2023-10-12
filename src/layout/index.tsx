import Navigation from "../navigation";
import {Outlet} from "react-router-dom";
import classes from "./style.module.css";
import Footer from "./footer";

export default function Layout() {
    return (
        <div className="container">
            <Navigation/>
            <main className={classes.main}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}