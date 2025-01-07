import { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "User route" });
});

export const userRouter = router;
