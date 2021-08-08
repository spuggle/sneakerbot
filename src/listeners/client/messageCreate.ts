import { Message } from "discord.js";

import {
  ART_CHANNEL_ID, FEATURE_CHANNEL_ID, SNEAKER_ID
} from "../../config";

const imageExtensionPattern = /\.(?:png|jpe?g|gif|webp)/ui;

export async function messageCreate(rawMessage: Message): Promise<void> {
  const message = rawMessage.partial as boolean
    ? await rawMessage.fetch() as Message | undefined
    : rawMessage;

  if (!message || message.author.bot) return;
  console.log("Valid message detected!");

  if (message.content.toLowerCase().startsWith("$ping")) {
    return void message.channel.send("Pong!");
  }

  if (!message.attachments.size) return;

  const isNotSneaker = message.author.id !== SNEAKER_ID;
  const isNotArtChannel = message.channel.id !== ART_CHANNEL_ID;
  if (isNotSneaker || isNotArtChannel) return;

  const attachedImages = message.attachments
    .filter(({ url }) => imageExtensionPattern.test(url))
    .map(({ url }) => url);

  const guild = await message.guild?.fetch();
  if (!guild) return;

  const featureChannel = await guild.channels
    .fetch(FEATURE_CHANNEL_ID);

  if (!featureChannel || featureChannel.type !== "GUILD_TEXT") return;

  await featureChannel.send({
    files: attachedImages
  });
}
