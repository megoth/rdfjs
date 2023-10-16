import style from "./style.module.css";
import Notification from "../notification";
import useNotification from "../../hooks/use-notification";

export default function NotificationList() {
    const {notifications} = useNotification();

    return (
        <div className={style.notifications}>
            {notifications.filter(({hidden}) => !hidden).map((notification, index) => (
                <Notification key={notification.id} index={index} notification={notification} />
            ))}
        </div>
    )
}