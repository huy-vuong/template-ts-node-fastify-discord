import 'dotenv/config';
import 'module-alias/register';

import { startBot } from 'template-ts-node-fastify-discord/bot/bot';

const defaultPort = 3000;

async function start() {
  const applicationId = process.env.DISCORD_APPLICATION_ID;
  if (!applicationId) {
    console.error(
      `DISCORD_APPLICATION_ID must be set in .env; received: ${applicationId}`,
    );
    process.exit(1);
  }
  const publicKey = process.env.DISCORD_PUBLIC_KEY;
  if (!publicKey) {
    console.error(
      `DISCORD_PUBLIC_KEY must be set in .env; received: ${publicKey}`,
    );
    process.exit(1);
  }
  const port = Number(process.env.PORT);

  startBot(!Number.isNaN(port) ? port : defaultPort, applicationId, publicKey);
}

start().then(() => {});
