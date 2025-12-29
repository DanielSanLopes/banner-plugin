import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, ctx: RouteContext<'/api/status'>) {
    return NextResponse.json("OK");
}