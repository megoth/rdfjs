import Content from "../../content";
import Box from "../../box";

interface Props {
    setInit: (value: boolean) => void
}

export default function MLdInitStep({setInit}: Props) {
    return <Box>
        <Content>
            <p>This demo requires a bit of setup, so please start it by pressing the button.</p>
        </Content>
        <button className="button is-primary" onClick={() => setInit(true)}>Start demo</button>
    </Box>
}