import mongoose from "mongoose";
export async function connectDB() {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb! : ${dbConnection.connection.host}`)
    } catch (error) {
        console.error(error.message);
    }
}