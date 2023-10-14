import Content from "../content";
import {useSolidAuth} from "@ldo/solid-react";

export default function LogoutButton() {
    const {logout} = useSolidAuth();
    return (
        <Content>
            <button className="button is-small" onClick={logout}>Log out</button>
        </Content>
    )
}