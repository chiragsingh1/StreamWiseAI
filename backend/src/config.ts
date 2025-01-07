export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL,
};
