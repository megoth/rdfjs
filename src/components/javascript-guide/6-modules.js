import localLibraryDefaultMethod, {doSomething} from "./some-local-library";
import externalLibraryDefaultMethod, {doSomethingElse} from "some-external-library";

export default doSomething;
export const aliasForDoSomething = doSomethingElse;
export function someFunction() {
    return doSomething() + doSomethingElse();
}