import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { streamRouter } from "./routes/streamRouter";

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/api/streams", streamRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome! Stream Wisely ✨🚀" });
});

export default app;
