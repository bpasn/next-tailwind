import mongoose from "mongoose";

const connections: { isConnected: number | boolean } = { isConnected: false };
async function connect() {
    if (connections.isConnected) {
        console.log("already connected")
        return;
    }
    if (mongoose.connections.length > 0) {
        connections.isConnected = mongoose.connections[0].readyState;
        if (connections.isConnected === 1) {
            console.log("user previous connection");
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("new connection");
    connections.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connections.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connections.isConnected = false;
        } else {
            console.log("not disconnected")
        }
    }
}


const db = { connect, disconnect }
export default db;