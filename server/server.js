const {Server}=require('socket.io');

const io=new Server(4000,{
    cors:true
});

const emailToSocketId=new Map();
const socketIdToEmail=new Map();

io.on('connection',(socket)=>{
    console.log('connected socket', socket.id);
    socket.on("Joining", (data)=>{
        
        const {email,room}=data;
        emailToSocketId.set(email,socket.id);
        socketIdToEmail.set(socket.id,email);

        socket.join(room);
         
        io.to(room).emit("User:Joined",{email, id:socket.id});
        io.to(socket.id).emit("Joining",data);
    })

    socket.on('Call:User',({to,offer})=>{
        io.to(to).emit("Incoming:Call",{from:socket.id,offer});
    })

})