import { Client, Intents } from "discord.js";

export class SneakerClient extends Client {

    constructor() {
        super({
            partials: [ "GUILD_MEMBER", "MESSAGE" ],
            intents: [ Intents.FLAGS.GUILD_MESSAGES ]
        });
    }

}
