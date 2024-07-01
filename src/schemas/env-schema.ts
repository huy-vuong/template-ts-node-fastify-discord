import { type Static, Type } from '@sinclair/typebox';

export const EnvSchema = Type.Object({
  HELLO: Type.String({ default: 'World' }),
  PORT: Type.Number({ default: 3000 }),
});

export type EnvSchemaType = Static<typeof EnvSchema>;
