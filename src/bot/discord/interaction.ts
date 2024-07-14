import { handleCommand } from 'template-ts-node-fastify-discord/bot/discord/command';
import {
  InteractionData,
  InteractionHandler,
  InteractionType,
} from 'template-ts-node-fastify-discord/bot/discord/types/discord';

export async function handleInteraction(
  type: InteractionType,
  data: InteractionData,
  applicationId: string,
  interactionId: string,
  interactionToken: string,
  handlersByCommandName: Record<string, InteractionHandler>,
) {
  if (
    type === InteractionType.ApplicationCommand &&
    handlersByCommandName[data.name]
  ) {
    await handleCommand(
      handlersByCommandName[data.name],
      data,
      applicationId,
      interactionId,
      interactionToken,
    );
  }
}
