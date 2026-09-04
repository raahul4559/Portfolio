/**
 * Shared between the server layout's no-flash script and the client store, so
 * both agree on where the palette preference lives. Kept in its own module to
 * avoid pulling the client store into the server bundle just for a string.
 */
export type Theme = "ink" | "paper";

export const THEME_KEY = "os.theme";

export const THEME_LABEL: Record<Theme, string> = {
  ink: "ink",
  paper: "paper",
};
