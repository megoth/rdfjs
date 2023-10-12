import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Footer(props: Props) {
    return (
        <footer {...props}>
            Coded by <a href="https://icanhasweb.net">Arne Hassel</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/megoth/semtechjs-demo">GitHub repo</a>
        </footer>
    )
}