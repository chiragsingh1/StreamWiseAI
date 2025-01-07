import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/stream", (req, res) => {
    res.json({ message: "Stream route" });
});

export const streamRouter = router;
