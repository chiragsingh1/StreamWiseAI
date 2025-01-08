import { Router, Request, Response } from "express";
import { prismaClient } from "../db";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { StreamSchema } from "../utils/types";
import { z } from "zod";
import { youtube } from "googleapis/build/src/apis/youtube";
import { YoutubeService } from "../services/YoutubeService";
const router = Router();

// Create a new stream
router.post("/", ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const userId = req.auth.userId;
        const validatedData = StreamSchema.parse(req.body);

        // Check if stream already exists for this user
        const existingStream = await prismaClient.stream.findFirst({
            where: {
                userId,
                youtubeId: validatedData.youtubeId,
                status: "ACTIVE",
            },
        });

        if (existingStream) {
            res.status(400).json({ error: "Stream already being monitored" });
        } else {
            const stream = await prismaClient.stream.create({
                data: {
                    userId,
                    youtubeId: validatedData.youtubeId,
                    title: validatedData.title
                        ? validatedData.title
                        : `${
                              validatedData.youtubeId +
                              "-" +
                              new Date().toISOString()
                          }`,
                    status: "ACTIVE",
                },
            });

            res.json({ stream });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        }
        console.error("Error creating stream:", error);
        res.status(500).json({ error: "Failed to create stream" });
    }
});

router.get(
    "/:streamId/messages",
    ClerkExpressRequireAuth(),
    async (req, res) => {
        try {
            const { streamId } = req.params;
            const { userId } = req.auth;

            // Check if stream already exists for this user
            const existingStream = await prismaClient.stream.findFirst({
                where: {
                    userId,
                    youtubeId: streamId,
                    status: "ACTIVE",
                },
            });
            if (!existingStream)
                res.status(400).json({ messages: "You are not authorized!" });
            else {
                const youtube = YoutubeService.fetchLiveChatMessages(streamId);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ error: "Failed to fetch messages" });
        }
    }
);

router.get("/", (req, res) => {
    res.json({ message: "Stream route" });
});

export const streamRouter = router;
