import ThemeButton from '../../components/ThemeButton';

const ColorThemePalette = () => {
  return (
    <main id="main" className="relative flex bg-white">
      <div className="flex flex-col mt-5 ml-5 bg-white">
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">DESCRIPTIONS:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Primary Color. Takes up most of color space. Other colors picked based on this</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Secondary Color. Compliments Primary. Similar Hue to Primary.</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Tertiary Color. Contrasts Primary. Used for text, borders, splitting divs visually</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Fourth. Another complimenting color like Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Fifth. Another contrasting color like tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Sixth. Another contrasting color like tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Same Brightness. Same Tone as Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "180px", width: "120px", fontSize: "14px"}}>Opposite Brightness. Opposite Tone as Primary</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">LIGHT THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#BAF3DB"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#7EE2B8"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#1C3329"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#DCFFF1"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#2ABB7F"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#1F845A"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ffffff"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#000000"}}>Opposite</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">DARK THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#1c1e30"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#303459"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff0266"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#313138"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff0266"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#bb86fc"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#121212"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#dddded"}}>Opposite</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">DEREN THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#091833"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#133E7C"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#EA00D9"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#711C91"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#0ABDC6"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#F3E600"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#121212"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#FFFFFF"}}>Opposite</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">SAM THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff0000"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff5252"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#560000"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff7b7b"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#620004"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#740005"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff0000"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ffffff"}}>Opposite</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">LENNON THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#f8ed62"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#fff9ae"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#660066"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#e9d700"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#800080"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#be29ec"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#f8ed62"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#000000"}}>Opposite</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">RENE THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#004c4c"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#006666"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#d1f3f1"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#008080"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ff0065"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#43e8d8"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#004c4c"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ffffff"}}>Opposite</div>
        </div>
        <div className="flex flex-row w-full mt-5">
          <div className="text-center w-full mb-2">BLAINE THEME:</div>
        </div>
        <div className="flex flex-row mb-10">
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#fff2e6"}}>Primary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ffb380"}}>Secondary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#994d00"}}>Tertiary</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#ffffff"}}>Fourth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#336633"}}>Fifth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#1e3504"}}>Sixth</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#fff2e6"}}>Same</div>
          <div className="mr-5 outline outline-1 text-center" style={{height: "120px", width: "120px", backgroundColor:"#000000"}}>Opposite</div>
        </div>
      </div>
    </main>
  )
}

export default ColorThemePalette