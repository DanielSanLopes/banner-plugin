

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
          <input type="text" className="hidden" name="timezone" id="timezone" />
          <script>
            document.getElementById('timezone').value = (new Date().getTimezoneOffset()/-60).toString();
          </script>

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
              name="hasSchedule" 
              className="bg-gray-100 dark:bg-gray-800 peer" 
              id="hasSchedule"/>
            <br />
            <input 
              type="datetime-local" 
              name="schedule" 
              className="hidden peer-checked:block bg-[#fcfcfc] dark:bg-[#333333] text-[#ffffff]" />
              <br />
              <div className="hidden peer-checked:block">
                <label>
                Definir duração?
                &nbsp;
                &nbsp;
                <input 
                  type="checkbox" 
                  name="hasDuration" 
                  className=" bg-gray-100 dark:bg-gray-800 peer" 
                  id="hasDuration"/>
                  <br />
  
                <div className="hidden peer-checked:block">
                  Duração (em dias):
                </div>
                <input 
                type="number" 
                name="duration" 
                className="hidden peer-checked:block bg-[#fcfcfc] dark:bg-[#333333] text-[#ffffff]" />
                </label>
              </div>

          </label>
          <br />
          <input type="submit" value="Enviar" className="bg-blue-500 text-white py-2 px-4 rounded" />
        </form>
      </main>
      
    </div>
  );
}
