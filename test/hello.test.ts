import { getHello } from 'template-ts-node-fastify-discord/hello';

describe('getHello', () => {
  test("returns the string 'Hello World!'", () => {
    expect(getHello('World')).toBe('Hello World!');
  });
});
