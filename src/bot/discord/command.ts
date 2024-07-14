import { createInteractionResponse } from 'template-ts-node-fastify-discord/bot/discord/client';
import {
  InteractionData,
  InteractionHandler,
} from 'template-ts-node-fastify-discord/bot/discord/types/discord';

export async function handleCommand(
  handler: InteractionHandler,
  data: InteractionData,
  applicationId: string,
  interactionId: string,
  interactionToken: string,
) {
  await createInteractionResponse(interactionId, interactionToken);
  await handler(data, applicationId, interactionToken);
}
