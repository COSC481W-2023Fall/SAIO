export default function setSiteColorTheme(num) {
    switch (num) {
        // LIGHT THEME
        case 1:
            document.documentElement.style.setProperty('--PrimaryColor', '#BAF3DB')
            document.documentElement.style.setProperty('--SecondaryColor', '#7EE2B8')
            document.documentElement.style.setProperty('--TertiaryColor', '#1C3329')
            document.documentElement.style.setProperty('--FourthColor', '#DCFFF1')
            document.documentElement.style.setProperty('--FifthColor', '#2ABB7F')
            document.documentElement.style.setProperty('--SixthColor', '#1F845A')
            document.documentElement.style.setProperty('--SameShadeColor', '#ffffff')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#000000')
            document.documentElement.style.setProperty('--FontFamily', 'Lexend, sans-serif')
            break;

        // DARK THEME
        case 2:
            document.documentElement.style.setProperty('--PrimaryColor', '#1c1e30')
            document.documentElement.style.setProperty('--SecondaryColor', '#303459')
            document.documentElement.style.setProperty('--TertiaryColor', '#ff0266')
            document.documentElement.style.setProperty('--FourthColor', '#313138')
            document.documentElement.style.setProperty('--FifthColor', '#ff0266')
            document.documentElement.style.setProperty('--SixthColor', '#bb86fc')
            document.documentElement.style.setProperty('--SameShadeColor', '#121212')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#dddded')
            document.documentElement.style.setProperty('--FontFamily', 'Lexend, sans-serif')
            break;

        // DEREN THEME
        case 3:
            document.documentElement.style.setProperty('--PrimaryColor', '#091833')
            document.documentElement.style.setProperty('--SecondaryColor', '#133E7C')
            document.documentElement.style.setProperty('--TertiaryColor', '#EA00D9')
            document.documentElement.style.setProperty('--FourthColor', '#711C91')
            document.documentElement.style.setProperty('--FifthColor', '#0ABDC6')
            document.documentElement.style.setProperty('--SixthColor', '#F3E600')
            document.documentElement.style.setProperty('--SameShadeColor', '#121212')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#FFFFFF')
            break;

        // SAM THEME
        case 4:
            document.documentElement.style.setProperty('--PrimaryColor', '#ff0000')
            document.documentElement.style.setProperty('--SecondaryColor', '#ff5252')
            document.documentElement.style.setProperty('--TertiaryColor', '#560000')
            document.documentElement.style.setProperty('--FourthColor', '#ff7b7b')
            document.documentElement.style.setProperty('--FifthColor', '#620004')
            document.documentElement.style.setProperty('--SixthColor', '#740005')
            document.documentElement.style.setProperty('--SameShadeColor', '#ff0000')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#ffffff')
            document.documentElement.style.setProperty('--FontFamily', 'Anonymous Pro, sans-serif')
            break;

        // LENNON THEME
        case 5:
            document.documentElement.style.setProperty('--PrimaryColor', '#f8ed62')
            document.documentElement.style.setProperty('--SecondaryColor', '#fff9ae')
            document.documentElement.style.setProperty('--TertiaryColor', '#660066')
            document.documentElement.style.setProperty('--FourthColor', '#e9d700')
            document.documentElement.style.setProperty('--FifthColor', '#800080')
            document.documentElement.style.setProperty('--SixthColor', '#be29ec')
            document.documentElement.style.setProperty('--SameShadeColor', '#f8ed62')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#000000')
            break;

        // RENE THEME
        case 6:
            document.documentElement.style.setProperty('--PrimaryColor', '#004c4c')
            document.documentElement.style.setProperty('--SecondaryColor', '#006666')
            document.documentElement.style.setProperty('--TertiaryColor', '#d1f3f1')
            document.documentElement.style.setProperty('--FourthColor', '#008080')
            document.documentElement.style.setProperty('--FifthColor', '#ff0065')
            document.documentElement.style.setProperty('--SixthColor', '#43e8d8')
            document.documentElement.style.setProperty('--SameShadeColor', '#004c4c')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#ffffff')
            break;

        // BLAINE THEME
        case 7:
            document.documentElement.style.setProperty('--PrimaryColor', '#1a1a1a')
            document.documentElement.style.setProperty('--SecondaryColor', '#595959')
            document.documentElement.style.setProperty('--TertiaryColor', 'orange')
            document.documentElement.style.setProperty('--FourthColor', '#1a1aff')
            document.documentElement.style.setProperty('--FifthColor', '#ff0000')
            document.documentElement.style.setProperty('--SixthColor', '#ff6600')
            document.documentElement.style.setProperty('--SameShadeColor', '#fff2e6')
            document.documentElement.style.setProperty('--OppositeShadeColor', 'black')
            break;
    }
}