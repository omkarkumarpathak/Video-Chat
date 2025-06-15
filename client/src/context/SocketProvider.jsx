import { useContext,createContext,useMemo } from 'react';

import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket=()=>{
    const socket=useContext(SocketContext);
    return socket;
}

function SocketProvider(props) {

    const socket = useMemo(() => io('localhost:4000'),[]);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
