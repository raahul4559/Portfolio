/**
 * Plain, non-reactive DOM side effects — navigating away, opening a tab,
 * writing to the clipboard.
 *
 * Kept as free functions in their own module rather than inlined at the call
 * site: they run from inside event handlers defined during render (palette
 * actions, terminal commands), and keeping the actual `window` mutation
 * outside the component body is both clearer about intent and keeps React's
 * compiler-based lints focused on real render-purity issues instead of
 * flagging an assignment to `window.location`.
 */

export function openExternal(href: string): void {
  window.open(href, "_blank", "noopener");
}

export function openMailto(email: string): void {
  window.location.href = `mailto:${email}`;
}

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
