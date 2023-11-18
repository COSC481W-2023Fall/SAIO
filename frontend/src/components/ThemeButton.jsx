import React, { useEffect, useState } from 'react';

import { IoIosColorFill } from "react-icons/io";

import setSiteColorTheme from './setColorTheme';

const ThemeButton = () => {

  // Theme Variables
  const [lightMode, setLightMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [derenMode, setDerenMode] = useState(false);
  const [samMode, setSamMode] = useState(false);
  const [lennonMode, setLennonMode] = useState(false);
  const [reneMode, setReneMode] = useState(false);
  const [blaineMode, setBlaineMode] = useState(false);

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
    setDerenMode(JSON.parse(window.localStorage.getItem('derenMode')));
    setSamMode(JSON.parse(window.localStorage.getItem('samMode')));
    setLennonMode(JSON.parse(window.localStorage.getItem('lennonMode')));
    setReneMode(JSON.parse(window.localStorage.getItem('reneMode')));
    setBlaineMode(JSON.parse(window.localStorage.getItem('blaineMode')));
    setThemeNum(JSON.parse(window.localStorage.getItem('themeNum')));
  }, []);

  // Reads the current theme from local storage
  useEffect(() => {
    window.localStorage.setItem('lightMode', lightMode);
    window.localStorage.setItem('darkMode', darkMode);
    window.localStorage.setItem('derenMode', derenMode);
    window.localStorage.setItem('samMode', samMode);
    window.localStorage.setItem('lennonMode', lennonMode);
    window.localStorage.setItem('reneMode', reneMode);
    window.localStorage.setItem('blaineMode', blaineMode);
    window.localStorage.setItem('themeNum', themeNum);
  }, [lightMode, darkMode, derenMode, samMode, lennonMode, reneMode, blaineMode, themeNum]);

  useEffect(() => {
    setSiteColorTheme(themeNum);
  }, [themeNum])

  // Turns on Light Theme
  const turnOnLightMode = () => {
    setLightMode(true)
    setDarkMode(false)
    setDerenMode(false)
    setSamMode(false)
    setLennonMode(false)
    setReneMode(false)
    setBlaineMode(false)
    setThemeNum(1)
    setSiteColorTheme(themeNum)
  }

  // Turns on Dark Theme
  const turnOnDarkMode = () => {
    setLightMode(false)
    setDarkMode(true)
    setDerenMode(false)
    setSamMode(false)
    setLennonMode(false)
    setReneMode(false)
    setBlaineMode(false)
    setThemeNum(2)
    setSiteColorTheme(themeNum)
  }

  // Turns on Deren's Theme
  const turnOnDerenMode = () => {
    setLightMode(false)
    setDarkMode(false)
    setDerenMode(true)
    setSamMode(false)
    setLennonMode(false)
    setReneMode(false)
    setBlaineMode(false)
    setThemeNum(3)
    setSiteColorTheme(themeNum)
  }

  // Turns on Sam's Theme
  const turnOnSamMode = () => {
    setLightMode(false)
    setDarkMode(false)
    setDerenMode(false)
    setSamMode(true)
    setLennonMode(false)
    setReneMode(false)
    setBlaineMode(false)
    setThemeNum(4)
    setSiteColorTheme(themeNum)
  }

  // Turns on Lennon's Theme
  const turnOnLennonMode = () => {
    setLightMode(false)
    setDarkMode(false)
    setDerenMode(false)
    setSamMode(false)
    setLennonMode(true)
    setReneMode(false)
    setBlaineMode(false)
    setThemeNum(5)
    setSiteColorTheme(themeNum)
  }

  // Turns on Rene's Theme
  const turnOnReneMode = () => {
    setLightMode(false)
    setDarkMode(false)
    setDerenMode(false)
    setSamMode(false)
    setLennonMode(false)
    setReneMode(true)
    setBlaineMode(false)
    setThemeNum(6)
    setSiteColorTheme(themeNum)
  }

  // Turns on Blaine's Theme
  const turnOnBlaineMode = () => {
    setLightMode(false)
    setDarkMode(false)
    setDerenMode(false)
    setSamMode(false)
    setLennonMode(false)
    setReneMode(false)
    setBlaineMode(true)
    setThemeNum(7)
    setSiteColorTheme(themeNum)
  }

  return (
    <div className='absolute bottom-1 right-1'>
      {buttonOpen
      ?
        <div className='right-0'>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnLightMode}>Light Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnDarkMode}>Dark Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnDerenMode}>Deren Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnSamMode}>Sam Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnLennonMode}>Lennon Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnReneMode}>Rene Mode</div>
          <div className='outline outline-2 bg-white mb-2' onClick={turnOnBlaineMode}>Blaine Mode</div>
        </div>
      :
        <div></div>
      }
      
      <IoIosColorFill className='h-10 w-10' onClick={handleThemeButtonOpen} style={{color: "white"}} />
    </div>
  )
}

export default ThemeButton