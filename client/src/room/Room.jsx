import { useEffect, useCallback, useState } from 'react'
import { useSocket } from '../context/SocketProvider'
import ReactPlayer from 'react-player'
import peer from '../service/peer.js'

function Room() {

  const [socketId, setSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const socket = useSocket();

  const handleUserJoining = useCallback(({ email, id }) => {
    setSocketId(id);
    console.log(`Joined User ${id}`)
  }, [])


  const handleIncomingCall=useCallback(({from,offer})=>{
    console.log(from);
    console.log(offer);
  },[])

  useEffect(() => {

    socket.on("User:Joined", handleUserJoining);
    socket.on("Incoming:Call", handleIncomingCall);

    return () => {
      socket.off("User:Joined", handleUserJoining);
       socket.off("Incoming:Call", handleIncomingCall);
    }

  }, [socket, handleUserJoining,handleIncomingCall]);

  const handleVideoCall=useCallback(async()=>{

    const stream=await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })

    const offer =await peer.getOfferFunction();

    socket.emit('Call:User',{to:socketId, offer});

    setMyStream(stream);

  },[socketId,socket])

  return (
    <div>
      <h2>Room</h2>
      {
        socketId && (
          <div>
            <h5>Connected</h5>
            <button onClick={handleVideoCall}>Call</button>
          </div>
        )
      }
      {
        myStream && 
        <ReactPlayer height="300px" width="300px"  url={myStream} playing  />
      }
    </div>
  )
}

export default Room
