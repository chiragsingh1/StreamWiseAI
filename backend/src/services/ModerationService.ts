import { OpenAI } from "openai";
import { Message } from "../utils/types";
import { config } from "../config";

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export class ModerationService {
    static async moderateMessages(messages: Message[]) {
        // Process messages in batches to minimize API calls
        const BATCH_SIZE = 10;
        const results = [];

        for (let i = 0; i < messages.length; i += BATCH_SIZE) {
            const batch = messages.slice(i, i + BATCH_SIZE);
            const batchContent = batch.map((m) => m.content).join("\n");

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "Analyze each message for offensive content, profanity, or inappropriate language. Message can be in any language. Respond with an array of objects containing the original message and two other fields: 'isOffensive' as a boolean and 'reason' as a string for each message.",
                    },
                    {
                        role: "user",
                        content: batchContent,
                    },
                ],
            });

            const moderationResults = JSON.parse(
                completion.choices[0].message?.content || "[]"
            );

            results.push(...moderationResults);
        }

        return results;
    }
}
