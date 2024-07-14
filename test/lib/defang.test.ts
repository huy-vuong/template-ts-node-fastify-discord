import { defang } from 'template-ts-node-fastify-discord/lib/defang';

describe('defang', () => {
  test('returns defanged http URLs', () => {
    expect(defang('http://evil.dev')).toBe('hXXp://evil[.]dev');
  });
  test('returns defanged https URLs', () => {
    expect(defang('https://spoopy.com')).toBe('hXXps://spoopy[.]com');
  });
});
