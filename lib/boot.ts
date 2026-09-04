/**
 * Shared by the pre-paint script in the root layout and the boot component.
 * Session-scoped on purpose: the sequence should feel like arriving, and
 * arriving twice in one session is just a delay.
 */
export const BOOT_KEY = "os.booted";

export function markBooted() {
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
    document.documentElement.dataset.booted = "1";
  } catch {
    document.documentElement.dataset.booted = "1";
  }
}

export function hasBooted(): boolean {
  if (document.documentElement.dataset.booted === "1") return true;
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}
