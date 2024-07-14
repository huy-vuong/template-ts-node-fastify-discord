import { InteractionType } from 'template-ts-node-fastify-discord/bot/discord/types/discord';

export const CommandsRequestBodySchema = {
  type: 'object',
  required: ['type', 'id', 'token'],
  properties: {
    type: {
      type: 'number',
      enum: [InteractionType.Ping, InteractionType.ApplicationCommand],
    },
    id: { type: 'string' },
    data: {
      type: 'object',
      required: ['name', 'options'],
      properties: {
        name: { type: 'string' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            required: ['value'],
            properties: { value: { type: 'string' } },
          },
        },
      },
    },
    token: { type: 'string' },
  },
};
