import { NextRequest, NextResponse } from "next/server";
import {setNewBanner} from '../../services/supabase'


export async function POST(request: NextRequest, ctx: RouteContext<'/api/setnewbanner'>) {
    let errorCode: number | null = null
    let errorMessage: string | null = null

    const formData = await request.formData();
    const imgFile = formData.get("bannerImage") as File;
    let pageURL = formData.get("pageURL") as string;
    let duration = formData.get("duration") as string;
    let schedule = formData.get("schedule") as string;
    let timezone = formData.get("timezone") as string;


    console.log("duration", duration)

    schedule = !schedule ? new Date().toString() : schedule;
    duration = !duration ? new Date().toString() : duration;

    console.log("duration", duration)

    let digit = timezone.length > 2 ? '' : '0';
    timezone = `${timezone[0]}${digit}${timezone[1]}:00`

    // console.log('Form Data:', { pageURL, duration, schedule, timezone });
    // console.log(schedule)
    // console.log(schedule + timezone)
    // console.log(new Date(schedule + timezone).getTime());

    if (pageURL.at(-1) !== '/') {
        pageURL += '/';
    }

    pageURL = encodeURIComponent(pageURL);

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

    const newBannerData = {
        pageURL,
        imgFile,
        schedule,
        duration,
        timezone,
        errorMessage,
        errorCode
    }

    const result = await setNewBanner(newBannerData);

    if (result?.errorCode) {
        errorCode = result.errorCode;
        errorMessage = result.errorMessage;
    }

//#region services

// let fileName = `${crypto.randomUUID()}-${imgFile.name}`;

// const imgURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner-plugin/${fileName}`;

//    const resultStorage = await supabase.storage.from('banner-plugin').upload(fileName, imgFile, {contentType: imgFile.type})
//     if (resultStorage.error) {
//         console.error('Erro ao fazer upload da imagem:', resultStorage.error);
//         errorMessage = 'Erro ao fazer upload da imagem. Tente novamente mais tarde';
//         errorCode = 500;
//     }

    // console.log('fullPath:', resultStorage.data?.fullPath);
    // const imgURL = `${supabaseUrl}/storage/v1/object/public/banner-plugin/${fileName}`;
    // console.log('imgURL:', imgURL);

    // const durationTimestamp = duration? Number.parseInt(duration) * 24 * 60 * 60 * 1000 : 0;

    // console.log(new Date(new Date(schedule + timezone).getTime() + durationTimestamp), "oooii");

    // console.log({
    //     idURL: pageURL,
    //     imgURL: imgURL,
    //     schedule:  new Date(new Date(schedule + timezone).getTime()),
    //     duration: new Date(new Date(schedule + timezone).getTime() + durationTimestamp)
    // })

    // const resultDatabase = await supabase.from('banner-post').upsert({
    //     idURL: pageURL,
    //     imgURL: imgURL,
    //     schedule:  new Date(new Date(schedule + timezone).getTime() + durationTimestamp),
    //     duration: new Date(new Date(schedule + timezone).getTime() + durationTimestamp)
    // },{
    //     onConflict: 'idURL'
    // });

    // if (resultDatabase.error) {
    //     console.error('Erro ao inserir no banco de dados:', resultDatabase.error);
    //     errorMessage = 'Erro ao salvar dados. Tente novamente mais tarde';
    //     errorCode = 500;
    // }

    // console.log(resultDatabase.data)
//#endregion
 
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
}



