import { Client, Intents } from "discord.js";

export class SneakerClient extends Client {

    constructor() {
        super({
            partials: [ "GUILD_MEMBER", "MESSAGE" ],
            intents: [
              Intents.FLAGS.GUILDS,
              Intents.FLAGS.GUILD_MESSAGES
            ]
        });
    }

}
