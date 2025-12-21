import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const siteUrl = searchParams.get("url");
  console.log(siteUrl);

  return NextResponse.json({
    siteUrl
  });
}
