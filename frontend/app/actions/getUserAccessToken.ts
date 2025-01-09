"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

async function getGoogleToken() {
    const { userId } = await auth();
    console.log(userId);

    const client = await clerkClient();
    const token = await client.users.getUserOauthAccessToken(
        userId || "",
        "oauth_google"
    );

    console.log(token);

    return {
        token: token.data[0].token,
    };
}
