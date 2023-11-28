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
    if (activeTheme) {
      setTheme(activeTheme);
    }
    else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // localStorage.setItem(theme);
    setSiteColorTheme(theme);
  }, [theme])

  const themeClick = (event) => {
    setTheme(event.target.innerHTML);
  }

  return (
    <div className='absolute bottom-1 right-1'>
      {buttonOpen
      ?
        <div className='right-0'>
          {/* The theme name comes from the the div's innerHTML value. */}
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Standard Light</div>
          <div className='outline outline-2 bg-white mb-2' onClick={themeClick}>Standard Dark</div>
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
      
      <IoIosColorFill className='h-10 w-10 oppositeShadeColor' onClick={handleThemeButtonOpen} />
    </div>
  )
}

export default ThemeButton