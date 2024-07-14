import axios from 'axios';
import {
  ApplicationCommand,
  InteractionCallbackType,
} from 'template-ts-node-fastify-discord/bot/discord/types/discord';

const discordApiVersion = 10;

function getBaseUrl() {
  return `https://discord.com/api/v${discordApiVersion}`;
}

/**
 * POST /interactions/{interaction.id}/{interaction.token}/callback
 * https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
 *
 * From https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object:
 * > To respond to a gateway Interaction, make a `POST` request like this.
 * > `interaction_id` is the unique id of that individual Interaction from the
 * > received payload. `interaction_token` is the unique token for that
 * > interaction from the received payload. **This endpoint is only valid for
 * > Interactions received over the gateway.**
 */
export async function createInteractionResponse(
  interactionId: string,
  interactionToken: string,
) {
  await axios.post(
    `${getBaseUrl()}/interactions/${interactionId}/${interactionToken}/callback`,
    {
      type: InteractionCallbackType.DeferredChannelMessageWithSource,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

/**
 * PATCH /webhooks/{application.id}/{interaction.token}/messages/@original
 * https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
 */
export async function editOriginalInteractionResponse(
  applicationId: string,
  interactionToken: string,
  content: string,
) {
  await axios.patch(
    `${getBaseUrl()}/webhooks/${applicationId}/${interactionToken}/messages/@original`,
    {
      type: InteractionCallbackType.ChannelMessageWithSource,
      content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

/**
 * POST /applications/{application.id}/guilds/{guild.id}/commands
 * https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
 */
export async function createGuildApplicationCommand(
  applicationId: string,
  guildId: string,
  botToken: string,
  command: ApplicationCommand,
) {
  await axios.post(
    `${getBaseUrl()}/applications/${applicationId}/guilds/${guildId}/commands`,
    {
      type: command.type,
      name: command.name,
      description: command.description,
      options: command.options ?? [],
    },
    {
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
}
