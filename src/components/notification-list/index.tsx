import {useContext} from "react";
import NotificationContext from "../../contexts/notification";
import style from "./style.module.css";
import Notification from "../notification";

export default function NotificationList() {
    const {notifications} = useContext(NotificationContext);

    return (
        <div className={style.notifications}>
            {notifications.filter(({hidden}) => !hidden).map((notification, index) => (
                <Notification key={notification.id} index={index} notification={notification} />
            ))}
        </div>
    )
}