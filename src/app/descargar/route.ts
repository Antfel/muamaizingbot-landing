import { NextResponse } from "next/server";
import { latestAssetUrl } from "@/lib/release";

/** www.muamaizingbot.com/descargar → newest 64-bit APK (BlueStacks and most phones). */
export function GET() {
  return NextResponse.redirect(latestAssetUrl("arm64"), 302);
}
