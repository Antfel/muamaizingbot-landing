/**
 * APKs live as GitHub Releases on a public, code-free repo. Asset names never change, so
 * `/releases/latest/download/<name>` always serves the newest build. Publishing a new
 * version (scripts/publish_apk_release.sh in the bot repo) updates the site without a deploy.
 */
export const RELEASES_REPO = "Antfel/muamaizingbot-releases";

export const APK_ASSETS = {
  arm64: "MuAmaizingBot-arm64.apk",
  arm32: "MuAmaizingBot-arm32.apk",
} as const;

export type ApkVariant = keyof typeof APK_ASSETS;

export function latestAssetUrl(variant: ApkVariant): string {
  return `https://github.com/${RELEASES_REPO}/releases/latest/download/${APK_ASSETS[variant]}`;
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

/** Latest release metadata for the download card; null when GitHub is unreachable. */
export async function getLatestRelease(): Promise<ReleaseInfo | null> {
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
