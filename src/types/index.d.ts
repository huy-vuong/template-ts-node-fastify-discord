import 'fastify';
import { EnvSchemaType } from 'template-ts-node-fastify/schemas/env-schema';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchemaType;
  }
}
