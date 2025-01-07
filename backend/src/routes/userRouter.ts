import { Router } from "express";
import { prismaClient as prisma } from "../db";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { config } from "../config";
import { createClerkClient } from "@clerk/backend";

const router = Router();

const clerkClient = createClerkClient({
    secretKey: config.CLERK_SECRET_KEY,
});

// Create user profile (called after Clerk authentication)
router.post(
    "/profile",
    ClerkExpressRequireAuth({ signInUrl: config.FRONTEND_URL }),
    async (req, res) => {
        try {
            const userIdFromClerk = req.auth.userId;
            if (!userIdFromClerk) {
                res.status(401).json({ error: "Unauthorized" });
            }

            // Fetch user details from Clerk
            const userDetailsClerk = await clerkClient.users.getUser(
                userIdFromClerk
            );
            const email = userDetailsClerk.emailAddresses[0]?.emailAddress; // Primary email address
            const name =
                userDetailsClerk.firstName && userDetailsClerk.lastName
                    ? `${userDetailsClerk.firstName} ${userDetailsClerk.lastName}`
                    : userDetailsClerk.username || "anonymous";

            // Use these details in your logic
            let dbUser = await prisma.user.findUnique({
                where: { googleId: userIdFromClerk },
            });

            if (!dbUser) {
                // Create new user
                dbUser = await prisma.user.create({
                    data: {
                        email,
                        name,
                        googleId: userIdFromClerk,
                    },
                });
            }

            res.json({ user: dbUser });
        } catch (error) {
            console.error("Error creating user profile:", error);
            res.status(500).json({ error: "Failed to create user profile" });
        }
    }
);

// Get user profile from the databse
router.get("/profile", ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const userId = req.auth.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                _count: {
                    select: {
                        streams: true,
                    },
                },
            },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
});

// Route to calculate stats for the user
router.get("/stats", ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
        }

        const stats = await prisma.$transaction([
            // Total Active Streams
            prisma.stream.count({
                where: {
                    userId,
                    status: "ACTIVE",
                },
            }),
            // Total Messages Processed
            prisma.message.count({
                where: {
                    stream: {
                        userId,
                    },
                },
            }),
            // Total Offensive Messages Caught
            prisma.message.count({
                where: {
                    stream: {
                        userId,
                    },
                    isOffensive: true,
                },
            }),
        ]);

        res.json({
            activeStreams: stats[0],
            totalMessages: stats[1],
            offensiveMessages: stats[2],
            offensivePercentage:
                stats[1] > 0 ? ((stats[2] / stats[1]) * 100).toFixed(2) : 0,
        });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).json({ error: "Failed to fetch user stats" });
    }
});

router.get("/", (req, res) => {
    res.json({ message: "User route" });
});

export const userRouter = router;
