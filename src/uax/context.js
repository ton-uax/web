import { createContext, useState } from 'react';
import { TonClient as ton, DebotModule } from '@tonclient/core';
import { libWeb, libWebSetup } from '@tonclient/lib-web';
libWebSetup({
    debugLog: console.log,
    binaryURL: process.env.PUBLIC_URL + "/tonclient.wasm",
})
ton.useBinaryLibrary(libWeb);

export const TONContext = createContext();
export const TONContextProvider = props => {

    const [client] = useState(new ton({
        network: {
            server_address: 'net.ton.dev'
        }
    }));

    const [dengine] = useState(new DebotModule(client))

    return (
        <TONContext.Provider value={{ client, dengine }}>
            {props.children}
        </TONContext.Provider>
    );
};
