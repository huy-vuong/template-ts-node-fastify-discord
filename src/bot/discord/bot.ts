import Cors from '@fastify/cors';
import Sensible from '@fastify/sensible';
import { verify } from 'discord-verify/node';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { handleInteraction } from 'template-ts-node-fastify-discord/bot/discord/interaction';
import { PostInteractionRequest } from 'template-ts-node-fastify-discord/bot/discord/types/fastify';
import { CommandsRequestBodySchema } from 'template-ts-node-fastify-discord/schemas/schemas';
import {
  InteractionCallbackType,
  InteractionHandler,
  InteractionType,
} from 'template-ts-node-fastify-discord/bot/discord/types/discord';

export async function startDiscordBot(
  port: number,
  applicationId: string,
  publicKey: string,
  handlersByCommandName: Record<string, InteractionHandler>,
) {
  const fastify = Fastify({ logger: true });
  try {
    await fastify.register(Sensible);
    await fastify.register(Cors, { origin: true });
    fastify.addHook(
      'preHandler',
      async (
        req: FastifyRequest<PostInteractionRequest>,
        res: FastifyReply,
      ) => {
        if (req.method === 'POST') {
          const signature = req.headers['x-signature-ed25519'];
          const timestamp = req.headers['x-signature-timestamp'];
          const rawBody = JSON.stringify(req.body);

          const isValid = await verify(
            rawBody,
            signature,
            timestamp,
            publicKey,
            // eslint-disable-next-line
            require('node:crypto').webcrypto.subtle,
          );

          if (!isValid) {
            fastify.log.info('Invalid signature');
            return res.code(401).send('Invalid signature');
          }
        }
        return true;
      },
    );
    fastify.post('/interactions', {
      handler: async (
        request: FastifyRequest<PostInteractionRequest>,
        reply: FastifyReply,
      ) => {
        if (request.body.type === InteractionType.Ping) {
          return reply.send({ type: InteractionCallbackType.Pong });
        }
        const {
          type,
          id: interactionId,
          data,
          token: interactionToken,
        } = request.body;
        await handleInteraction(
          type,
          data!,
          applicationId,
          interactionId,
          interactionToken,
          handlersByCommandName,
        );
        return null;
      },
      schema: { body: CommandsRequestBodySchema },
    });
    fastify.listen({ port }, () => {
      console.log(`listening at http://localhost:${port}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
