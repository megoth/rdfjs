import {MeldIoConfig} from "@m-ld/m-ld/ext/socket.io";

export const baseConfig: Partial<MeldIoConfig> = {
    io: {uri: "https://gw.m-ld.org"},
}