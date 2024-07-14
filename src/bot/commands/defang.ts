import { editOriginalInteractionResponse } from 'template-ts-node-fastify-discord/bot/discord/client';
import { InteractionData } from 'template-ts-node-fastify-discord/bot/discord/types/discord';
import { defang } from 'template-ts-node-fastify-discord/lib/defang';

export async function handleDefangCommand(
  data: InteractionData,
  applicationId: string,
  interactionToken: string,
) {
  try {
    const url = data.options[0].value?.match(/\bhttps?:\/\/\S+/i)?.[0];
    await editOriginalInteractionResponse(
      applicationId,
      interactionToken,
      await processDefang(url),
    );
  } catch (e) {
    await editOriginalInteractionResponse(
      applicationId,
      interactionToken,
      `❌ Encountered error:\n\`\`\`\n${e}\n\`\`\``,
    );
  }
}

async function processDefang(url: string | undefined): Promise<string> {
  if (!url) {
    return `❓ No URL found.`;
  }
  return defang(url);
}
