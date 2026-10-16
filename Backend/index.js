import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroutes.js';
import userRouter from './routes/userroutes.js';
import providerRouter from './routes/providerroutes.js';
import bookingRouter from './routes/bookingroute.js';
import cors from 'cors';
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8400;

// 🔥 Connect DB
connectDB();

// 🔥 Middlewares
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

// 🔥 CORS (FINAL FIX)
const allowedOrigins = [
    "http://localhost:5173",
    "https://service-hub-wrdt.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
// 🔥 IMPORTANT: preflight handle karo

// 🔥 Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// 🔥 Static folder
app.use("/uploads", express.static("uploads"));

// 🔥 Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/provider', providerRouter);


// 🔥 Test route (optional)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// 🔥 Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;