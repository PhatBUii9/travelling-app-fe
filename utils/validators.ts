// utils/validators.ts
export const isNonEmpty = (s: string) => s.trim().length > 0;

export const isEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export type StrengthLabel = "Weak" | "Medium" | "Strong";
export const passwordStrength = (
  pwd: string,
): { label: StrengthLabel; score: number } => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;

  const label: StrengthLabel =
    score <= 1 ? "Weak" : score === 2 ? "Medium" : "Strong";
  return { label, score };
};

export const passwordsMatch = (a: string, b: string) => a === b && a.length > 0;
