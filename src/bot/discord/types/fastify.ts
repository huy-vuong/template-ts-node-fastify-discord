import { InteractionData } from 'template-ts-node-fastify-discord/bot/discord/types/discord';

export interface PostInteractionRequest {
  Body: PostInteractionRequestBody;
  Headers: {
    'x-signature-ed25519': string;
    'x-signature-timestamp': string;
  };
}

export interface PostInteractionRequestBody {
  type: number;
  id: string;
  data?: InteractionData;
  token: string;
}
