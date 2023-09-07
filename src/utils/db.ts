import mongoose, { FlattenMaps, Types } from "mongoose";

const connections: { isConnected: number | boolean } = { isConnected: false };
async function connect() {
    console.log(mongoose.connections)
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

function convertDocToObj(doc: FlattenMaps<any>) {
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}
const db = { connect, disconnect,convertDocToObj }
export default db;