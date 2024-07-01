import Cors from '@fastify/cors';
import Env from '@fastify/env';
import Sensible from '@fastify/sensible';
import { FastifyInstance } from 'fastify';
import { EnvSchema } from 'template-ts-node-fastify-discord/schemas/env-schema';
import Routes from 'template-ts-node-fastify-discord/routes/routes';

export default async function App(fastify: FastifyInstance): Promise<void> {
  await fastify.register(Env, { schema: EnvSchema, dotenv: true });

  await fastify.register(Sensible);

  await fastify.register(Cors, { origin: true });

  await fastify.register(Routes);
}
