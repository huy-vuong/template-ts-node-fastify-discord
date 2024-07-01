import { FastifyInstance } from 'fastify';
import { get, post } from 'template-ts-node-fastify-discord/handlers/handlers';

export default async function Routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/', get(fastify));

  fastify.post('/', post(fastify));
}
