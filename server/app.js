import cookieParser from "cookie-parser";
import express from "express";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//user routes
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

export { app };
