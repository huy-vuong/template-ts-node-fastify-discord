export function defang(url: string): string {
  return url.replace('http', 'hXXp').replace('.', '[.]');
}
