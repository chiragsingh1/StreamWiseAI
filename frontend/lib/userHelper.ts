"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";

async function getUserDetails() {
    const { userId } = await auth();

    const client = await clerkClient();
    const token = await client.users.getUserOauthAccessToken(
        userId || "",
        "oauth_google"
    );
    const accessToken = token.data[0].token;
    const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&broadcastStatus=active&key=`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return JSON.stringify(token);
}
