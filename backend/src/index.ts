import app from "./app";
import { config } from "./config";

const startServer = () => {
    try {
        const server = app.listen(config.PORT, () => {
            console.log(`
🚀 Server is running!
🔊 Listening on port ${config.PORT}
🌎 Environment: ${config.NODE_ENV}
      `);
        });

        process.on("SIGTERM", () => {
            console.log("SIGTERM signal received: closing HTTP server");
            server.close(() => {
                console.log("HTTP server closed");
                process.exit(0);
            });
        });
    } catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
};

// Start the server
startServer();
