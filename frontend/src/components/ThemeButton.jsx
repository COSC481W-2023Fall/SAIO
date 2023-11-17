import React, { useEffect, useState } from 'react';

import { IoIosColorFill } from "react-icons/io";

import setSiteColorTheme from './setColorTheme';

const ThemeButton = () => {

  // Theme Variables
  const [lightMode, setLightMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [greenMode, setGreenMode] = useState(false);

  // Current Theme
  const [themeNum, setThemeNum] = useState(1);

  // Toggle Theme Button Open
  const [buttonOpen, setButtonOpen] = useState(false);

  // Handle Form Toggle
  const handleThemeButtonOpen = () => {
    setButtonOpen(!buttonOpen);
}

  // Adds the current theme to local storage
  useEffect(() => {
    setLightMode(JSON.parse(window.localStorage.getItem('lightMode')));
    setDarkMode(JSON.parse(window.localStorage.getItem('darkMode')));
    setGreenMode(JSON.parse(window.localStorage.getItem('greenMode')));
    setThemeNum(JSON.parse(window.localStorage.getItem('themeNum')));
  }, []);

  // Reads the current theme from local storage
  useEffect(() => {
    window.localStorage.setItem('lightMode', lightMode);
    window.localStorage.setItem('darkMode', darkMode);
    window.localStorage.setItem('greenMode', greenMode);
    window.localStorage.setItem('themeNum', themeNum);
  }, [lightMode, darkMode, greenMode, themeNum]);

  useEffect(() => {
    setSiteColorTheme(themeNum);
  }, [themeNum])

  // Turns on Light Theme
  const turnOnLightMode = () => {
    setLightMode(true)
    setDarkMode(false)
    setGreenMode(false)
    setThemeNum(1)
    setSiteColorTheme(themeNum)
  }

  // Turns on Dark Theme
  const turnOnDarkMode = () => {
    setLightMode(false)
    setDarkMode(true)
    setGreenMode(false)
    setThemeNum(2)
    setSiteColorTheme(themeNum)
  }

  // Turns on Green Theme
  const turnOnGreenMode = () => {
    setLightMode(false)
    setDarkMode(false)
    setGreenMode(true)
    setThemeNum(3)
    setSiteColorTheme(themeNum)
  }

  return (
    <div className='absolute bottom-1 right-1'>
      {buttonOpen
      ?
        <div className='right-0'>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnLightMode}>Light Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnDarkMode}>Dark Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnGreenMode}>Green Mode</div>
        </div>
      :
        <div></div>
      }
      
      <IoIosColorFill className='h-10 w-10' onClick={handleThemeButtonOpen} />
    </div>
  )
}

export default ThemeButton