/**
 * APKs are served from the release Mac at downloads.muamaizingbot.com (cloudflared tunnel,
 * cached by Cloudflare). `latest.json` there names the newest version and its versioned URLs;
 * scripts/publish_apk_release.sh in the bot repo rewrites it, so the site updates without a
 * deploy. GitHub Releases (uploads from Peru crawled at ~60 KB/s, 2026-11-19) stay as fallback
 * and for the in-app updater of older builds.
 */
export const DOWNLOADS_LATEST = "https://downloads.muamaizingbot.com/latest.json";
export const RELEASES_REPO = "Antfel/muamaizingbot-releases";

export const APK_ASSETS = {
  arm64: "MuAmaizingBot-arm64.apk",
  arm32: "MuAmaizingBot-arm32.apk",
} as const;

export type ApkVariant = keyof typeof APK_ASSETS;

function githubAssetUrl(variant: ApkVariant): string {
  return `https://github.com/${RELEASES_REPO}/releases/latest/download/${APK_ASSETS[variant]}`;
}

type LocalLatest = {
  version: string;
  published_at: string;
  assets: Record<ApkVariant, { url: string; size: number; sha256: string }>;
};

async function fetchLocalLatest(): Promise<LocalLatest | null> {
  try {
    const res = await fetch(DOWNLOADS_LATEST, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as LocalLatest;
    return data?.version && data.assets?.arm64?.url && data.assets?.arm32?.url ? data : null;
  } catch {
    return null;
  }
}

/** Newest APK URL: the release Mac when it answers, else GitHub's latest release. */
export async function latestAssetUrl(variant: ApkVariant): Promise<string> {
  const local = await fetchLocalLatest();
  return local?.assets[variant].url ?? githubAssetUrl(variant);
}

export type ReleaseInfo = {
  version: string;
  publishedAt: string;
  sizeMb: Record<ApkVariant, number | null>;
};

type GithubRelease = {
  tag_name: string;
  published_at: string;
  assets: { name: string; size: number }[];
};

/** Latest release metadata for the download card; null when neither source answers. */
export async function getLatestRelease(): Promise<ReleaseInfo | null> {
  const local = await fetchLocalLatest();
  if (local) {
    return {
      version: local.version,
      publishedAt: local.published_at,
      sizeMb: {
        arm64: Math.round(local.assets.arm64.size / 1_000_000),
        arm32: Math.round(local.assets.arm32.size / 1_000_000),
      },
    };
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${RELEASES_REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GithubRelease;
    const size = (name: string) => {
      const asset = data.assets.find((a) => a.name === name);
      return asset ? Math.round(asset.size / 1_000_000) : null;
    };
    return {
      version: data.tag_name.replace(/^v/, ""),
      publishedAt: data.published_at,
      sizeMb: { arm64: size(APK_ASSETS.arm64), arm32: size(APK_ASSETS.arm32) },
    };
  } catch {
    return null;
  }
}
