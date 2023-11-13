import {useContext} from "react";
import NotificationContext from "./context.tsx";

export default function useNotification() {
    return useContext(NotificationContext);
}

