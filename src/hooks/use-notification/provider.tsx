import {ReactNode, useCallback, useState} from "react";
import NotificationContext, {NotificationModel} from "./context.tsx";
import NotificationList from "../../components/notification-list";

interface Props {
    children: ReactNode;
}

export function NotificationContextProvider({children}: Props) {
    const [notifications, setNotifications] = useState<NotificationModel[]>([]);

    const hide = (id: string) => {
        const notification = notifications.find((message) => message.id === id && message.hidden);
        if (!notification) return;
        const index = notifications.indexOf(notification);
        setNotifications([...notifications.slice(0, index), {
            id: notification.id,
            hidden: true,
            message: notification.message,
        }, ...notifications.slice(index + 1)]);
    };

    const notify = useCallback((message: ReactNode) => setNotifications([...notifications, {
        id: window.crypto.randomUUID(),
        message,
        hidden: false
    }]), [notifications]);

    return (
        <NotificationContext.Provider value={{hide, notifications, notify}}>
            {children}
            <NotificationList/>
        </NotificationContext.Provider>
    )
}