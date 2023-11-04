import Code from "../code";
import {useMemo, useState} from "react";
import {clsx} from "clsx";
import usePrism from "../../hooks/use-prism";

type installType = "developer";

interface Props {
    name: string
    type?: installType
}

interface PackageManager {
    name: string;
    getInstall: (name: string, type?: installType) => string;
}

const PACKAGE_MANAGERS: Array<PackageManager> = [{
    name: "npm",
    getInstall: (name, type) => `npm i -${type && type === "developer" ? "D" : "S"} ${name}`
}, {
    name: "yarn",
    getInstall: (name, type) => `yarn add ${name}${type && type === "developer" ? " -D" : ""}`
}, {
    name: "pnpm",
    getInstall: (name, type) => `pnpm add ${type && type === "developer" ? "-D " : ""}${name}`
}]

export default function Install({name, type}: Props) {
    const highlightAll = usePrism();
    const [currentManager, setCurrentManager] = useState(0);
    const code = useMemo(() => PACKAGE_MANAGERS[currentManager].getInstall(name, type), [currentManager])
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