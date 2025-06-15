import { useEffect,useCallback } from 'react'
import { useSocket } from '../context/SocketProvider' 

function Room() {

    const socket=useSocket();

    const handleUserJoining=useCallback(({email,id})=>{ 

        console.log(`User ${email} Joined the room ${id}`);

    },[])

    useEffect(()=>{
        socket.on("User:Joined",handleUserJoining);

        return ()=>{
            socket.off("User:Joined", handleUserJoining);
        }

    },[socket,handleUserJoining]);

  return (
    <h1>
      Room
    </h1>
  )
}

export default Room
