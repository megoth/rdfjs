import {createContext, ReactNode, useState} from "react";
import NotificationList from "../../components/notification-list";

const NotificationContext = createContext<{
    hide: (id: string) => void;
    notifications: Array<NotificationModel>;
    notify: (node: ReactNode) => void;
}>({
    hide: () => undefined,
    notifications: [],
    notify: () => undefined,
});
export default NotificationContext;

interface Props {
    children: ReactNode;
}

export interface NotificationModel {
    id: string;
    message: ReactNode;
    hidden: boolean;
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

    const notify = (message: ReactNode) => setNotifications([...notifications, {
        id: window.crypto.randomUUID(),
        message,
        hidden: false
    }]);

    return (
        <NotificationContext.Provider value={{hide, notifications, notify}}>
            {children}
            <NotificationList/>
        </NotificationContext.Provider>
    )
}
