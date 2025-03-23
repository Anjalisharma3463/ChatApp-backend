import { WebSocketServer , WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room:string;
}
// https://github.com/Anjalisharma3463/ChatApp-backend.git
let usercount = 0;
let allsockets:User[] = []; 


wss.on("connection", (socket)=>{
//sockets lets talk to the client who is connected to the server
 
 
console.log("Client connected #" );


socket.on("message",(message) => {
//  '{
//     type: "join";
//     room: string;
//  }
//  {
//     type: "message";
//     message: string;
//     room: string;
//  } '

// above is string of object   that will come from client
 
const parsedMessage = JSON.parse(message.toString());
//converted from string  to object to acces values

if(parsedMessage.type === "join"){
     allsockets.push(
        {socket, 
         room: parsedMessage.payload.roomId
        });
}
else if(parsedMessage.type === "chat"){
        
    let currentuserroom = null;
    for (let i = 0; i < allsockets.length; i++) {
        const user = allsockets[i];
        if(user.socket === socket){
            // jis socket ne msg bejha h vo h socket (current socket)
            currentuserroom = user.room;
        }


        for (let i = 0; i < allsockets.length; i++) {
            const user = allsockets[i];
            if(user.room === currentuserroom){
                const s = user.socket;
                s.send(parsedMessage.payload.message) 
            }
        }
        
    }
    
    
    
    //   for (let i = 0; i < allsockets.length; i++) {
        //     const element = allsockets[i];
        //     const s = element.socket;
        //     const room = element.room;
        //     if (room === parsedMessage.payload.roomId) {
        //         s.send(JSON.stringify({
        //             type: "chat",
        //             payload: {
        //                 message: parsedMessage.payload.message
        //             }
        //         }));
        //     }
            
        //   }    

}

    console.log(" Message Received: ", message.toString());
    // here server is able to catch the message that server will sent to furthur client
 
}) 
 
socket.on( "disconnect", () => {
    console.log("Client Disconnected"); 
    // here socket is all users who are connected from the server ....!
    allsockets = allsockets.filter(s => s.socket !== socket);  
    // allsockets = allsockets.find(s => s.socket == socket  );
} )
});