/** Wrap plain text into lines of at most `maxLen` characters (word-aware). */
export function wrapWords(text: string, maxLen: number, maxLines: number): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxLen) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, maxLines);
}
