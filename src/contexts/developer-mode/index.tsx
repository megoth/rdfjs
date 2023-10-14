import {createContext, ReactNode, useState} from "react";
import useLocalStorage from "use-local-storage";
import {LdoBase} from "ldo/lib/util";
import {STORAGE_KEYS} from "../../constants.ts";

export type SubjectNode<T extends LdoBase> = {
    resourceUrl: string;
    ldo: T;
}

export interface NodeBase extends LdoBase {
}

interface DeveloperModeContextProps<T extends LdoBase> {
    developerMode: boolean
    setDeveloperMode: (editMode: boolean) => void
    subjects: Array<SubjectNode<T>>
    addSubject: (resourceUrl: string, subject: T) => void
}

const DeveloperModeContext = createContext<DeveloperModeContextProps<NodeBase>>({
    developerMode: false,
    setDeveloperMode: () => {
    },
    subjects: [],
    addSubject: () => {
    }
});
export default DeveloperModeContext;

interface DeveloperModeContextProviderProps {
    children: ReactNode;
}

export function DeveloperModeContextProvider({children}: DeveloperModeContextProviderProps) {
    const [developerMode, setDeveloperMode] = useLocalStorage<boolean>(STORAGE_KEYS.DEVELOPER_MODE, true);
    const [subjects, setSubjects] = useState<Array<SubjectNode<LdoBase>>>([]);

    function addSubject<T extends LdoBase>(resourceUrl: string, ldo: T) {
        const existingIndex = subjects.findIndex((item) => item.ldo["@id"] === ldo["@id"] && item.resourceUrl === resourceUrl);
        const node = {ldo, resourceUrl};
        if (existingIndex === -1) {
            subjects.push(node);
        } else {
            subjects[existingIndex] = node;
        }
        setSubjects([...subjects]);
    }

    return (
        <DeveloperModeContext.Provider value={{developerMode, setDeveloperMode, subjects, addSubject}}>
            {children}
        </DeveloperModeContext.Provider>
    )
}
