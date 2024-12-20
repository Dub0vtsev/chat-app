import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'https://chat-app-3c1c.onrender.com'
}));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); // Разрешить всплывающие окна
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none"); // Снять ограничения на встраивание
    next();
});

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB();
});