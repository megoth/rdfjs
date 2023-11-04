import Code from "../code";
import {useMemo, useState} from "react";
import {clsx} from "clsx";
import usePrism from "../../hooks/use-prism";

interface Props {
    name: string
}

interface PackageManager {
    name: string;
    getInstall: (name: string) => string;
}

const PACKAGE_MANAGERS: Array<PackageManager> = [{
    name: "npm",
    getInstall: (name) => `npm i -S ${name}`
}, {
    name: "yarn",
    getInstall: (name) => `yarn add ${name}`
}, {
    name: "pnpm",
    getInstall: (name) => `pnpm add ${name}`
}]

export default function Install({name}: Props) {
    const highlightAll = usePrism();
    const [currentManager, setCurrentManager] = useState(0);
    const code = useMemo(() => PACKAGE_MANAGERS[currentManager].getInstall(name), [currentManager])
    const onClick = (index: number) => () => {
        setCurrentManager(index);
        highlightAll();
    };
    const buttons = <div className="field has-addons">
        {PACKAGE_MANAGERS.map(({name}, index) => (
            <p key={`install-button-${name}-${index}`} className="control">
                <button className={clsx("button is-small is-light", {
                    "is-active": currentManager === index
                })} onClick={onClick(index)}>{name}</button>
            </p>
        ))}
    </div>;
    return <Code language="bash" code={code} buttons={buttons}/>
}