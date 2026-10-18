import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is missing from .env");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

export default connectDB;