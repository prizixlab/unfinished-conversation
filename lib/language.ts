import { franc, francAll } from 'franc-min';
import langs from 'langs';

const HIGH_CONFIDENCE_SCORE = 0.98;
const HIGH_CONFIDENCE_MARGIN = 0.12;
const SHORT_LATIN_CHAR_LIMIT = 120;
const SHORT_LATIN_WORD_LIMIT = 20;

function isLatinScript(text: string) {
  const letters = text.match(/\p{L}/gu) ?? [];
  if (letters.length === 0) return true;

  const latinLetters = text.match(/\p{Script=Latin}/gu) ?? [];
  return latinLetters.length / letters.length >= 0.9;
}

function isShortLatinText(text: string) {
  const normalized = text.trim();
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;

  return (
    isLatinScript(normalized) &&
    (normalized.length < SHORT_LATIN_CHAR_LIMIT || wordCount < SHORT_LATIN_WORD_LIMIT)
  );
}

function languageName(code: string) {
  const language = langs.where('3', code);
  return language?.name ?? null;
}

export function detectLanguage(text: string) {
  const normalized = text ?? '';
  const code = franc(normalized, { minLength: 12 });
  if (code === 'und') return null;

  if (isShortLatinText(normalized)) {
    const ranked = francAll(normalized, { minLength: 3 });
    const [bestCode, bestScore = 0] = ranked[0] ?? [];
    const [, secondScore = 0] = ranked[1] ?? [];

    if (
      bestCode !== 'eng' &&
      (bestCode !== code ||
        bestScore < HIGH_CONFIDENCE_SCORE ||
        bestScore - secondScore < HIGH_CONFIDENCE_MARGIN)
    ) {
      return 'English';
    }
  }

  return languageName(code);
}
