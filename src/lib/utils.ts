export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: any }
  | ClassValue[];

/**
 * Self-contained zero-dependency class name merging utility.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  function process(input: ClassValue) {
    if (!input) return;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      input.forEach(process);
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }

  inputs.forEach(process);
  return classes.filter(Boolean).join(" ");
}

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}
