import {createContext, lazy, ReactNode, useContext, useState} from "react";
import {ClientSuspense} from "rakkasjs";

const NotificationContext = createContext<{
    hide: (id: string) => void;
    notifications: Array<NotificationModel>;
    notify: (node: ReactNode) => void;
}>({
    hide: () => undefined,
    notifications: [],
    notify: () => undefined,
});

const ClientComponent = lazy(() => import("../../components/notification-list"));

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

    const notify = (message: ReactNode) => setNotifications([...notifications, {
        id: window.crypto.randomUUID(),
        message,
        hidden: false
    }]);

    return (
        <NotificationContext.Provider value={{hide, notifications, notify}}>
            {children}
            <ClientSuspense fallback={""}>
                {<ClientComponent />}
            </ClientSuspense>
        </NotificationContext.Provider>
    )
}

export default function useNotification() {
    return useContext(NotificationContext);
}

export interface NotificationModel {
    id: string;
    message: ReactNode;
    hidden: boolean;
}
