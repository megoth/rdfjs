import {createContext, ReactNode} from "react";

export interface NotificationModel {
    id: string;
    message: ReactNode;
    hidden: boolean;
}

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