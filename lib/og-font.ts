const FONT_URLS: Record<500 | 700, string> = {
  500: "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf",
  700: "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf",
};

/**
 * OG images render through Satori, which — unlike the browser — has no
 * notion of a system monospace font, so the generic `monospace` family falls
 * back to Satori's default sans. Fetching the real weights at generation
 * time keeps the share cards visually consistent with the site's actual
 * mono voice instead of a look-alike substitute.
 */
export async function loadMonoFont(weight: 500 | 700) {
  const res = await fetch(FONT_URLS[weight]);
  return res.arrayBuffer();
}
