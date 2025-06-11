import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from './routes/applicationRoutes.js'
import userRouter from './routes/userRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import { dbConnection } from "./databases/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: ["https://job-harbour-01.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    exposedHeaders: ["Content-Disposition", "Content-Type"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add security headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(errorMiddleware);

dbConnection();
export default app;
