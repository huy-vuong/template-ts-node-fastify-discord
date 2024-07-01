import 'module-alias/register';

import Fastify from 'fastify';
import App from 'template-ts-node-fastify/app';

async function start() {
  const fastify = Fastify({ logger: true });

  await fastify.register(App);

  try {
    fastify.listen({ port: Number(process.env.PORT ?? 3000) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start().then(() => {});
