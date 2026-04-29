import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import ratelimit from './config/upstash.js';
import ratelimiter from './middleware/ratelimiter.js';
import cors from 'cors';

dotenv.config();

//const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true,
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(ratelimiter); // Apply the rate limiter middleware to all routes

// app.use((req,res,next) => {
//     console.log("Req method:", req.method, "URL:", req.url);
//     next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
});
