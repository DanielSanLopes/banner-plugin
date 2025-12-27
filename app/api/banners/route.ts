import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const siteUrl = searchParams.get("url");
  console.log(siteUrl);

  let res = new NextResponse("<head><img style='width: 100%; height: fit-content;' src='https://static.vecteezy.com/system/resources/previews/004/708/478/non_2x/purple-banner-design-modern-banner-template-design-with-purple-color-banner-for-social-media-cover-website-and-much-more-vector.jpg'/></head>")
  
  res.headers.set('Content-Type', 'text/html')


  

  return res

  // return NextResponse.json({
  //   siteUrl
  // });
}
