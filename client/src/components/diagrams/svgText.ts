/**
 * Wrap plain text into lines of at most `maxLen` characters (word-aware).
 * Text that needs more than `maxLines` is cut at a word boundary and ends
 * with an ellipsis, so a figure never shows a silently clipped sentence.
 */
export function wrapWords(
  text: string,
  maxLen: number,
  maxLines: number
): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxLen || !cur) cur = next;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length <= maxLines) return lines;

  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last.length + 1 > maxLen && last.includes(" ")) {
    last = last.slice(0, last.lastIndexOf(" "));
  }
  kept[maxLines - 1] = `${last.replace(/[\s,;:—–-]+$/, "")}…`;
  return kept;
}

/**
 * Wrap as many whole sentences as fit in `maxLines`. Prefer dropping a
 * trailing sentence to cutting one mid-thought; the full text lives in the
 * page copy the figure summarizes. Falls back to `wrapWords` (with its
 * ellipsis) when even the first sentence does not fit.
 */
export function wrapSentences(
  text: string,
  maxLen: number,
  maxLines: number
): string[] {
  const sentences = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/);
  let fitted = "";
  for (const sentence of sentences) {
    const candidate = fitted ? `${fitted} ${sentence}` : sentence;
    if (wrapWords(candidate, maxLen, Infinity).length > maxLines) break;
    fitted = candidate;
  }
  return wrapWords(fitted || text, maxLen, maxLines);
}
