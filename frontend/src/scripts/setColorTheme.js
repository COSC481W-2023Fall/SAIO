export default function setSiteColorTheme(theme) {
    if (!theme) theme = "standard light";
    
    /* DEFINE THEMES HERE! */

    switch (theme.toLowerCase()) {
        case "standard light":
            document.documentElement.style.setProperty('--PrimaryColor', '#FFFFFF')
            document.documentElement.style.setProperty('--SecondaryColor', '#DDDDDD')
            document.documentElement.style.setProperty('--TertiaryColor', '#BBBBBB')
            document.documentElement.style.setProperty('--FourthColor', '#BBBBBB')
            document.documentElement.style.setProperty('--FifthColor', '#BBBBBB')
            document.documentElement.style.setProperty('--SixthColor', '#f5763b')
            document.documentElement.style.setProperty('--SameShadeColor', '#ffffff')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#000000')
            document.documentElement.style.setProperty('--FontFamily', 'Lexend, sans-serif')
            document.documentElement.style.setProperty('--BoxShadow', '3px -0px 10px 1px gray')
            document.documentElement.style.setProperty('--BorderRadius', '12px')
            break;
        case "standard dark":
            document.documentElement.style.setProperty('--PrimaryColor', '#212329')
            document.documentElement.style.setProperty('--SecondaryColor', '#2b2a2e')
            document.documentElement.style.setProperty('--TertiaryColor', '#4d4949')
            document.documentElement.style.setProperty('--FourthColor', '#313138')
            document.documentElement.style.setProperty('--FifthColor', '#706c6c')
            document.documentElement.style.setProperty('--SixthColor', '#bb86fc')
            document.documentElement.style.setProperty('--SameShadeColor', '#121212')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#dddded')
            document.documentElement.style.setProperty('--FontFamily', 'Lexend, sans-serif')
            document.documentElement.style.setProperty('--BoxShadow', '5px 9px 10px 1px black')
            document.documentElement.style.setProperty('--BorderRadius', '12px')
            break;
        case "mint":
            document.documentElement.style.setProperty('--PrimaryColor', '#BAF3DB')
            document.documentElement.style.setProperty('--SecondaryColor', '#7EE2B8')
            document.documentElement.style.setProperty('--TertiaryColor', '#10ad76')
            document.documentElement.style.setProperty('--FourthColor', '#DCFFF1')
            document.documentElement.style.setProperty('--FifthColor', '#2ABB7F')
            document.documentElement.style.setProperty('--SixthColor', '#0d6f70')
            document.documentElement.style.setProperty('--SameShadeColor', '#ffffff')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#000000')
            document.documentElement.style.setProperty('--FontFamily', 'Lexend, sans-serif')
            document.documentElement.style.setProperty('--BoxShadow', '3px -0px 10px 1px gray')
            document.documentElement.style.setProperty('--BorderRadius', '12px')
            break;
        case "autumn":
            document.documentElement.style.setProperty('--PrimaryColor', '#fff2e6')
            document.documentElement.style.setProperty('--SecondaryColor', '#ffb380')
            document.documentElement.style.setProperty('--TertiaryColor', '#de5a1d')
            document.documentElement.style.setProperty('--FourthColor', '#ffffff')
            document.documentElement.style.setProperty('--FifthColor', '#f5e0a4')
            document.documentElement.style.setProperty('--SixthColor', '#1e3504')
            document.documentElement.style.setProperty('--SameShadeColor', '#fff2e6')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#000000')
            document.documentElement.style.setProperty('--BoxShadow', '3px -0px 10px 1px #594304')
            document.documentElement.style.setProperty('--BorderRadius', '12px')
            break;
        case "deren":
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