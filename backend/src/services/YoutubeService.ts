import { google } from "googleapis";
import { prismaClient } from "../db";
import { config } from "../config";

const youtube = google.youtube("v3");

export class YoutubeService {
    static async fetchLiveChatMessages(streamId: string, pageToken?: string) {
        const stream = await prismaClient.stream.findUnique({
            where: {
                id: streamId,
            },
        });

        if (!stream) throw new Error("Stream not found");

        const response = await youtube.liveChatMessages.list({
            auth: config.YOUTUBE_API_KEY,
            liveChatId: stream.youtubeId,
            part: ["snippet", "authorDetails"],
            pageToken,
        });

        const messages =
            response.data.items?.map((item) => ({
                content: item.snippet?.displayMessage || "",
                authorName: item.authorDetails?.displayName || "",
                youtubeId: item.id || "",
                timestamp:
                    item.snippet?.publishedAt || new Date().toISOString(),
            })) || [];
        return {
            messages,
            nextPageToken: response.data.nextPageToken,
        };
    }
}
