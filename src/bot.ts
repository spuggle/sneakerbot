import * as dotenv from "dotenv";
import { SneakerClient } from "./structs/SneakerClient";
import { messageCreate } from "./listeners/client/messageCreate";

dotenv.config();

const client = new SneakerClient();
client.on("messageCreate", messageCreate);

void client.login(process.env.BOT_TOKEN)
  .then(() => console.log("Successfully logged in!"));
