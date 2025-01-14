const express = require('express');
const {Server} = require('socket.io')
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('client Connected', socket.id);
    
    socket.on('chat-message', (msg) => {
        console.log('msg Recieved', msg);
        io.emit('chat-message', msg)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    })
})
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

