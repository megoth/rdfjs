import Content from "../../content";
import Box from "../../box";
import {HTMLAttributes} from "react";
import {clsx} from "clsx";

export default function MLdInitStep({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
    return <Box>
        <Content>
            <p>This demo requires a bit of setup, so please start it by pressing the button.</p>
        </Content>
        <button className={clsx("button is-primary", className)} {...props}>Start demo</button>
    </Box>
}