import { LoadCommands, LoadEvents } from "./classes/loaders";
import { Mirai } from "./classes/mirai";
import { config } from "dotenv";

const mirai = new Mirai();
mirai.construct({
    prefix: "!",
    database: {
        path: "./mirai/internal",
        tables: ["channels", "members", "servers", "users"]
    }
});

LoadCommands("./src/commands", mirai).then(() => console.log("Commands loaded!"));
LoadEvents("./src/events", mirai).then(() => console.log("Events loaded!"));

mirai.loginBot(config()?.parsed?.["TOKEN"] as string);