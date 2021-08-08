import { Message } from "discord.js";

import { SneakerClient } from "../../structs/SneakerClient";
import {
  ART_CHANNEL_ID, FEATURE_CHANNEL_ID, SNEAKER_ID
} from "../../config";

const imageExtensionPattern = /\.(?:png|jpe?g|gif|webp)/ui;

export async function messageCreate(rawMessage: Message) {
  const message = rawMessage.partial
    ? await rawMessage.fetch()
    : rawMessage;

  if (!message || !message.attachments.size) return;

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
