import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis do Supabase não definidas no .env')
}

const supabase = createClient(supabaseUrl, supabaseKey)


export async function POST(request: NextRequest, ctx: RouteContext<'/api/setnewbanner'>) {
    let errorCode: number | null = null
    let errorMessage: string | null = null

    const formData = await request.formData();
    const imgFile = formData.get("bannerImage") as File || null;
    
    if (!imgFile){
        errorCode = 400;
        errorMessage = 'Nenhum arquivo de imagem fornecido';
    }
    if (imgFile.size > 5 * 1024 * 1024){
        errorCode = 400;
        errorMessage = 'O tamanho do arquivo de imagem excede 5MB';
    }
    if(!imgFile.type.match(/image\/(png|jpg|jpeg|webp)/)){
        errorCode = 400;
        errorMessage = 'Tipo de arquivo inválido';
    }

    let fileName = `${crypto.randomUUID()}-${imgFile.name}`;

   const {error} = await supabase.storage.from('banner-plugin').upload(fileName, imgFile, {contentType: imgFile.type})
    if (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        errorMessage = 'Erro ao fazer upload da imagem. Tente novamente mais tarde';
        errorCode = 500;
    }



    if (errorCode) {
            const page = `<div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
                    <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-content gap-3 py-32 px-16 bg-white dark:bg-black sm:items-start'>
                        <h1 className='text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl'>
                            Erro ${errorCode}
                        </h1>
                        <h4>
                            ${errorMessage}
                        </h4>
                    </main>
                </div>`

        let response = new NextResponse(page, { status: errorCode });
        response.headers.set('Content-Type', 'text/html; charset=utf-8')
        return response;
    }


    

   let res = new NextResponse("Deu Certo!")

    res.headers.set('Content-Type', 'text/html')
    return res;

    // let res = new NextResponse("<head><img style='width: 100%; height: fit-content;' src='https://static.vecteezy.com/system/resources/previews/004/708/478/non_2x/purple-banner-design-modern-banner-template-design-with-purple-color-banner-for-social-media-cover-website-and-much-more-vector.jpg'/></head>")

    // res.headers.set('Content-Type', 'text/html')
    // return res;
    // return NextResponse.json({
    //   siteUrl
    // });
}


