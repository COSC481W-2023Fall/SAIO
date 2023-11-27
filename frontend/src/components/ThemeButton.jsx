import React, { useEffect, useState } from 'react';

import { IoIosColorFill } from "react-icons/io";

import setSiteColorTheme from '../scripts/setColorTheme';

const ThemeButton = () => {
  // Current Theme
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  // Toggle Theme Button Open
  const [buttonOpen, setButtonOpen] = useState(false);

  // Handle Form Toggle
  const handleThemeButtonOpen = () => {
    setButtonOpen(!buttonOpen);
  }

  // gets / sets current theme
  useEffect(() => {
    let activeTheme = localStorage.getItem("theme");
    console.log("activeTheme: " + activeTheme);
    if (activeTheme) {
      console.log("actvie!: " + activeTheme);
      setTheme(activeTheme);
    }
    else {
      console.log("inavtive!: " + activeTheme);
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    console.log("set to: " + theme);
    setSiteColorTheme(theme);
  }, [theme])

  const themeClick = (event) => {
    setTheme(event.target.innerHTML);
  }

  return (
    <div>
      <div className='absolute top-1 right-2'>
        <IoIosColorFill color="oppositeShadeColor" className='h-10 w-10 oppositeShadeColor' onClick={handleThemeButtonOpen} />
      </div>
      <div className='absolute top-9 mt-5 right-2'>
        {buttonOpen
        ?
        <div className='right-0'>
          {/* The theme name comes from the the div's innerHTML value. */}
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Light</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Dark</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Mint</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Autumn</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Lennon Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Rene Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Blaine Mode</div>
          {/* TODO: Add more themes here! */}
        </div>
        :
          <div></div>
        }
      </div>
    </div>
  )
}

export default ThemeButton