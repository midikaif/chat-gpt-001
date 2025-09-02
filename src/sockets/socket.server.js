const {Server} = require('socket.io');
const cookie = require('cookie');
const userModel = require('../models/user.model');
const generateResponse = require('../services/ai.service');
const jwt = require('jsonwebtoken')

function initSocketServer(httpServer){
    const io = new Server(httpServer,{});

    io.use(async (socket, next)=>{
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
        
        if(!cookies){
            next(new Error("Authentication error: no token provided"))
        }
        
        try{
            console.log('init')
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id);

            socket.user = user;
            next();

        }catch(err){
            next(new Error('Authentication error: Invalid Token'))
        }
    })


    io.on('connection', (socket)=>{
        console.log('New Socket connection: ', socket.id);
    
        socket.on('ai-message', async (messagePayload) => {
            
            const response = await generateResponse(messagePayload);

            socket.emit('ai-response',response)


        })
    
    })
}

module.exports = initSocketServer