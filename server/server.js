import dotenv from "dotenv"
dotenv.config();

import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

import { app, server } from "./socket/socket.js"


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
    preflightContinue: false,
}
app.use(cors(corsOptions));


// api route
import userRoute from "./Routes/user.route.js"
import postRoute from "./Routes/post.route.js"
import messageRoute from "./Routes/message.route.js"

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
    res.send("Server is Running...");
});

// server Running 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectDB();
    console.log(`Server is Running On POST: ${PORT}`);
})
