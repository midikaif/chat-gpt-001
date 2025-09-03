// Import the Pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API });

const chatGptIndex = pc.Index('chat-gpt-clone');

async function createMemory({vectors, metadata, messageId}){
    await chatGptIndex.upsert([{
        id: messageId,
        values: vectors,
        metadata
    }])
}

async function queryMemory({queryVector, limit=5, metadata}){
    const data = await chatGptIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata? {metadata} : undefined
    })
}


module.exports = {
    createMemory,
    queryMemory
}