import {useEffect, useMemo, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {clone, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes} from "@m-ld/m-ld/ext/socket.io";

export default function MLdSolidDemo() {
    // const {session: {webId}, fetch} = useSolidAuth();
    // const [error, setError] = useState<Error | null>(null);
    // const domainUrl = useMemo(() => `${uuid()}.public.gw.m-ld.org`, []);
    //
    // useEffect(() => {
    //     const config = {
    //         '@id': uuid(),
    //         '@domain': domainUrl,
    //         genesis: true,
    //         io: {uri: "https://gw.m-ld.org"}
    //     };
    //     clone(new MemoryLevel(), IoRemotes, config).then((meld) => {
    //         console.log("CLONE", meld);
    //     })
    // }, [domainUrl, fetch]);
    //
    // if (!error) {
    //     return <Loading/>
    // }
    //
    // const onSubmit = async (data: FormData) => {
    //     setError(null);
    //     // update
    //     console.log(webId, data);
    // };
    //
    // return <Demo error={error} name={"Not set"} onSubmit={onSubmit}/>
    return <Demo name={"Not set"} onSubmit={console.log} />
}