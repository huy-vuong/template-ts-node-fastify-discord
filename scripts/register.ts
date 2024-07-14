import 'dotenv/config';
import { createGuildApplicationCommand } from 'template-ts-node-fastify-discord/bot/discord/client';
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from 'template-ts-node-fastify-discord/bot/discord/types/discord';

const applicationId = process.env.DISCORD_APPLICATION_ID!;
const guildId = process.env.DISCORD_GUILD_ID!;
const botToken = process.env.DISCORD_BOT_TOKEN!;

const commands = [
  {
    type: ApplicationCommandType.ChatInput,
    name: 'defang',
    description: 'Defangs HTTP(S) URLs to make them safe to send',
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: 'url',
        description: 'URL to defang',
        required: true,
      },
    ],
  },
];

(async () => {
  try {
    await Promise.all(
      commands.map((command) =>
        createGuildApplicationCommand(
          applicationId,
          guildId,
          botToken,
          command,
        ),
      ),
    );
    console.log('Successfully registered application commands.');
  } catch (e) {
    console.error(e);
  }
})();
