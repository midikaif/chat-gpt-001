const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");


async function createChat(req,res){
    const {title} = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title
    });

    res.status(201).json({
        message: 'Chat created successfully',
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity
        }
    })
}

async function getChats(req,res){
    const user = req.user;
    const chats = await chatModel.find({user: user._id}).sort({lastActivity: -1}).limit(4);

    res.status(200).json({
        message: 'Chats retrieved successfully',
        chats
    });
}

async function getChatById(req,res){
    const user = req.user;
    const chatId = req.params.id;

    const chat = await messageModel.find({
        chat: chatId
    });

    if (!chat) {
        return res.status(404).json({
            message: 'Chat not found'
        });
    }

    res.status(200).json({
        message: 'Chat retrieved successfully',
        chat
    });
}

module.exports = {
    createChat,
    getChats,
    getChatById
}