import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB();
});