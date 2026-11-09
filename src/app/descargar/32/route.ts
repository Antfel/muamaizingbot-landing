import { NextResponse } from "next/server";
import { latestAssetUrl } from "@/lib/release";

/** www.muamaizingbot.com/descargar/32 → newest 32-bit APK (older phones). */
export function GET() {
  return NextResponse.redirect(latestAssetUrl("arm32"), 302);
}
