import {useContext, useEffect, useState} from "react";
import NotificationContext, {NotificationModel} from "../../contexts/notification";
import {clsx} from "clsx";

interface Props {
    index: number;
    notification: NotificationModel;
}

export default function Notification({index, notification}: Props) {
    const [hidden, setHidden] = useState(notification.hidden);
    const {hide} = useContext(NotificationContext);

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