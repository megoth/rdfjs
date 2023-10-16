import {useEffect, useState} from "react";
import {clsx} from "clsx";
import useNotification, {NotificationModel} from "../../hooks/use-notification";

interface Props {
    index: number;
    notification: NotificationModel;
}

export default function Notification({index, notification}: Props) {
    const [hidden, setHidden] = useState(notification.hidden);
    const {hide} = useNotification();

    useEffect(() => {
        setTimeout(() => {
            setHidden(true);
            hide(notification.id);
        }, 2000);
    }, [hide, notification.id]);

    return (
        <div className={clsx("notification is-success is-light", {"is-hidden": hidden})}
             key={`notification-${index}`}>
            <button className="delete" onClick={() => hide(notification.id)}></button>
            {notification.message}
        </div>
    )
}