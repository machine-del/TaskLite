import { MAX_TITLE_LENGTH } from './variables';

export function isValidTaskTitle(title: string): boolean {
  return title.length <= MAX_TITLE_LENGTH && title.trim().length >= 1;
}

export function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ");
}
