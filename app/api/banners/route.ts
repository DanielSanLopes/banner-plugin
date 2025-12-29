import { NextRequest, NextResponse } from "next/server";
import { getBannerURL } from "@/app/services/supabase";
import { headers } from "next/headers";


export async function GET(request: NextRequest, ctx: RouteContext<'/api/banners'>) {

  const { searchParams } = new URL(request.url);
  const siteUrl = encodeURIComponent(searchParams.get("url")!);
  console.log ("siteURL", siteUrl)

  const result = await getBannerURL(siteUrl)!;

  console.log("Banner result:", result.error);

  /////////////////////////////////////////////////////
  let res = new NextResponse(result.imgURL, {
    status: result.code!,
    statusText: result.message!,
    headers:{
      'X-Error-Code': result.error? result.code as any : null,  
      'Access-Control-Allow-Origin': '*'
    }
  })
  ////////////////////////////////////////////////////
  
  return res
} 
