import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(
    cors({
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json());

// Routes
app.use("/api/auth",authRoutes);   
// app.use("/api/resume",resumeRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

connectDB();

export default app;

