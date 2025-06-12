import { connect, disconnect } from "mongoose";

export default async function connectToDatabase() {
    try{
        await connect(process.env.MONGODB_URL, {
            //useNewUrlParser: true, 
            //useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
        throw new Error("Can Not Connect To MONGODB")
    }
}

async function disconnectToDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Can Not Connect To MONGODB.")
    }
}

export {connectToDatabase, disconnectToDatabase}