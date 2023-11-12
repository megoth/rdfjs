import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {clone} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {MqttRemotes, MeldMqttConfig} from '@m-ld/m-ld/ext/mqtt';


export default function InruptSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        const config: MeldMqttConfig = {
            '@id': webId,
            '@domain': new URL(webId).origin,
            genesis: true,
        };
        clone(new MemoryLevel, MqttRemotes, config).then((meld) => {
            // get
            console.log(meld);
        });
    }, [fetch, webId]);

    if (!error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        // update
        console.log(data);
    };

    return <Demo error={error} name={"Not set"} onSubmit={onSubmit}/>
}