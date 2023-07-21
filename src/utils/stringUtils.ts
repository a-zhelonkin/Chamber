const lineBreakRegex = /\r\n|\r|\n/i;

export function splitLines(thiz: string): string[] {
  return thiz ? thiz.split(lineBreakRegex) : [];
}
