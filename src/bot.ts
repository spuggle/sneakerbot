import * as dotenv from "dotenv";
import * as express from "express";
import { SneakerClient } from "./structs/SneakerClient";
import { messageCreate } from "./listeners/client/messageCreate";

dotenv.config();

const app = express();
app.get("/", (_, response) => {
  response.send("OK");
});

const client = new SneakerClient();
client.on("messageCreate", messageCreate);

void client.login(process.env.BOT_TOKEN)
  .then(() => console.log("Successfully logged in!"));

void app.listen(process.env.PORT || 80);
