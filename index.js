import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import apiRouter from "./routes/api/api.routes.js";
import http from "http";
import socketIo from "./utils/socketServer.js";

const app = express();
const server = http.createServer(app);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
dotenv.config();
mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 6000;
const HOST = process.env.HOST || "localhost";

app.use(
    cors({
        origin: "https://serhii-ikin.vercel.app",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("uploads"));

app.use("/api", apiRouter);

start();
socketIo(server);

async function start() {
    try {
        await mongoose
            .connect(process.env.DB_URL)
            .then(() => {
                console.log("connected to db", process.env.DB_UR);
            })
            .catch((error) => {
                console.error("Error connection to db:", error);
            });

        server.listen(PORT, HOST, () => {
            console.log(`Server running on port ${HOST}:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}
