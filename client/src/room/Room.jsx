import { useEffect,useCallback,useState } from 'react'
import { useSocket } from '../context/SocketProvider' 

function Room() {

    const [message,setMessage]=useState();

    const socket=useSocket();

    const handleUserJoining=useCallback(({email,id})=>{  
        setMessage( `User ${email} Joined the room ${id}`)

    },[])


    useEffect(()=>{

        socket.on("User:Joined",handleUserJoining);

        return ()=>{
            socket.off("User:Joined", handleUserJoining);
        }

    },[socket,handleUserJoining]);

  return (
    <div>
      <h2>Room</h2>
      <span>{message}</span>
    </div>
  )
}

export default Room
