import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try{
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    }catch(err){
        // If Database connection fails, log the error and exit the process
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
export default connectDB;