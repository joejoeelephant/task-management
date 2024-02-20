export function validateRequired(value: string): string | null {
  if (!value.trim()) {
    return "Can’t be empty";
  }
  return null;
}