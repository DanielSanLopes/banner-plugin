import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis do Supabase não definidas no .env')
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface NewBannerData {
    pageURL: string;
    imgFile: File;
    schedule: string;
    duration: string;
    timezone: string;
    errorMessage: string | null;
    errorCode: number | null;
}

interface GetBannerURLResponse {
    imgURL: string | null;
    code: number | null;
    message: string | null;
    error: boolean;
}


export async function setNewBanner(data: NewBannerData){
    let fileName = `${crypto.randomUUID()}-${data.imgFile.name}`;
    const imgURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banner-plugin/${fileName}`;

    const resultStorage = await supabase.storage.from('banner-plugin').upload(fileName, data.imgFile, {contentType: data.imgFile.type})
    if (resultStorage.error) {
        //console.error('Erro ao fazer upload da imagem:', resultStorage.error);
        data.errorMessage = 'Erro ao fazer upload da imagem. Tente novamente mais tarde';
        data.errorCode = 500;
        return {
            errorMessage: data.errorMessage,
            errorCode: data.errorCode
        }
    }

    const durationTimestamp = data.duration? Number.parseInt(data.duration) * 24 * 60 * 60 * 1000 : 0;

    const resultDatabase = await supabase.from('banner-post').upsert({
        idURL: data.pageURL,
        imgURL: imgURL,
        schedule:  new Date(new Date(data.schedule + data.timezone).getTime()),
        duration: new Date(new Date(data.schedule + data.timezone).getTime() + durationTimestamp)
    },{
        onConflict: 'idURL'
    });

    if (resultDatabase.error) {
        //console.error('Erro ao inserir no banco de dados:', resultDatabase.error);
        data.errorMessage = 'Erro ao salvar dados. Tente novamente mais tarde';
        data.errorCode = 500;
         return {
            errorMessage: data.errorMessage,
            errorCode: data.errorCode
        }
    }
}

export async function getBannerURL(pageURL: string) {

    let response: GetBannerURLResponse = {
        imgURL: '',
        code: null,
        message: null,
        error: true
    };

    const result = await supabase.from('banner-post').select('*').eq('idURL', pageURL);

    if (result.error) {
        console.error('Erro ao buscar dados do banner:', result.error);
        response.message = 'Erro ao buscar dados do banner. Tente novamente mais tarde';
        response.code = 500;
        response.error = true;
        console.log("Response:", response);
        return response;
    }

    const bannerData = result.data[0];
    if (!bannerData) {
        response.message = 'Nenhum banner encontrado para esta URL';
        response.code = 404;
        response.error = true;
        console.log("Response:", response);
        return response;
    }

    console.log("Banner Data:", bannerData);

    let tooEarly = new Date().getTime() < new Date(bannerData.schedule).getTime();
    let tooLate = (new Date().getTime() > new Date(bannerData.duration).getTime()) 
    && (bannerData.schedule !== bannerData.duration);

    if ((tooEarly || tooLate) && bannerData.schedule !== null && bannerData.duration !== null) {
        response.message = 'O banner está fora do período de exibição';
        response.code = 200;
        response.error = false;
        console.log("Response:", response);
        return response;
    }

    response.imgURL = bannerData.imgURL;
    response.code = 200;
    response.message = 'Banner encontrado com sucesso';
    response.error = false;

    return response;
}