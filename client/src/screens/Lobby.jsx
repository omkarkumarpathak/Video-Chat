import { useSocket } from '../context/SocketProvider';
import { useCallback,useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Lobby() {

    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const navigate=useNavigate();
    
    const socket = useSocket()

    const handleSubmit = useCallback((e) => {
        
        e.preventDefault();
        socket.emit("Joining",{email,room});
   
    }, [email,room,socket])

  
    const handleJoinRoom=useCallback((data)=>{ 

        const {email,room}=data;
        navigate(`/room/${room}`);

    },[navigate])

    useEffect(()=>{
        socket.on("Joining", handleJoinRoom)
        return ()=> {
            socket.off("Joining", handleJoinRoom);
        }
    },[])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" id='email' value={email} />
                </div>
                <div>
                    <label htmlFor="room">room</label>
                    <input onChange={(e) => setRoom(e.target.value)} type="text" id='room' value={room} />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Lobby
