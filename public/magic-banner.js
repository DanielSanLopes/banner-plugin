

async function getBanner (){

    let currentURL = encodeURIComponent(window.location.href)
    
    const result = await fetch(`https://banner-plugin.vercel.app/api/banners?url=${currentURL}`)

    //const result = await fetch(`http://localhost:3000/api/banners?url=${currentURL}`)

    if (result.status > 299){
        throw new Error("Code " + result.code + " - " + result.statusText)
    }

    const imgSource = await result.text();

    console.log(imgSource);

    const banner = 
    `<section class="magic-banner">
    <img src="${imgSource}" alt="Logo">
    <p>Scheduled for: <span id="schedule-time">1234567890</span></p>
    </section>`;

    document.body.insertAdjacentHTML("afterbegin", banner)

    window.scrollTo(0, 0);

}

getBanner();




