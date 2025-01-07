import { z } from "zod";

export const StreamSchema = z.object({
    youtubeId: z.string(),
    title: z.string().optional(),
});

export const MessageSchema = z.object({
    content: z.string(),
    authorName: z.string(),
    youtubeId: z.string(),
    timestamp: z.string(),
});
export type Stream = z.infer<typeof StreamSchema>;
export type Message = z.infer<typeof MessageSchema>;
