import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import path from 'path';
import resumeRoutes from './routes/resumeRoutes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import limiter from './config/rateLimiter';

const app = express();

// Apply rate limiting to all routes
app.use(limiter);

app.use(
    cors({
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads'),{
  setHeaders: (res, path, stat) => {
    res.set('Content-Type', 'image/jpeg');
    res.set("Access-Control-Allow-Origin", "*");
  },
}));

// Routes
app.use("/api/auth",authRoutes);   
app.use("/api/resume",resumeRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

connectDB();

export default app;

