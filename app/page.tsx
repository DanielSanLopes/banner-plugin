

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-content gap-3 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
          Welcome to the Banner Plugin
        </h1>
        <h4>
          Upload your banner
        </h4>
          <br />
          <br />
        <form 
          action="/api/setnewbanner" 
          method="post" 
          encType="multipart/form-data" 
          className="flex flex-col gap-4">

          <label>
            Upload de imagens png, jpg, jpeg ou webp:
            <br />
            <input 
              type="file" 
              name="bannerImage" 
              accept="image/png, image/jpg, image/jpeg, image/webp" 
              required 
              className="bg-gray-100 dark:bg-gray-800" />
               <br />
            (Limite de 5MB)
          </label> 
          <br />

          <label>
            Página de exibição do banner:
            <br />
            <input 
              type="url" 
              name="pageURL" 
              className="bg-gray-100 dark:bg-gray-800 w-full" 
              placeholder="Cole a URL da página de exibição do banner" />
          </label>
          <br />

          <label>
            Programar alteração?
            &nbsp;
            &nbsp;
            <input 
              type="checkbox" 
              name="scheduleChange" 
              className="bg-gray-100 dark:bg-gray-800 peer" 
              id="hasBanner"/>
            <br />
            <input 
              type="datetime-local" 
              name="scheduledTime" 
              className="hidden peer-checked:block bg-[#fcfcfc] dark:bg-[#333333] text-[#ffffff]" />
          </label>
        </form>
      </main>
    </div>
  );
}
