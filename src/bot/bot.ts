import { startDiscordBot } from 'template-ts-node-fastify-discord/bot/discord/bot';
import { handleDefangCommand } from 'template-ts-node-fastify-discord/bot/commands/defang';

export function startBot(
  port: number,
  applicationId: string,
  publicKey: string,
) {
  startDiscordBot(Number(port), applicationId, publicKey, {
    defang: handleDefangCommand,
  });
}
