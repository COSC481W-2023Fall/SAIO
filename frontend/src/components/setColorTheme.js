export default function setSiteColorTheme(num) {
    switch (num) {
        // LIGHT THEME
        case 1:
            document.documentElement.style.setProperty('--PrimaryColor', '#BAF3DB')
            document.documentElement.style.setProperty('--SecondaryColor', '#1F845A')
            document.documentElement.style.setProperty('--TertiaryColor', '#7EE2B8')
            document.documentElement.style.setProperty('--FourthColor', '#2ABB7F')
            document.documentElement.style.setProperty('--FifthColor', '#DCFFF1')
            document.documentElement.style.setProperty('--SixthColor', '#1C3329')
            document.documentElement.style.setProperty('--SameShadeColor', '#ffffff')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#000000')
            break;

        // DARK THEME
        case 2:
            document.documentElement.style.setProperty('--PrimaryColor', '#121212')
            document.documentElement.style.setProperty('--SecondaryColor', '#bb86fc')
            document.documentElement.style.setProperty('--TertiaryColor', '#3700B3')
            document.documentElement.style.setProperty('--FourthColor', '#03DAC5')
            document.documentElement.style.setProperty('--FifthColor', '#ff7597')
            document.documentElement.style.setProperty('--SixthColor', '#ff0266')
            document.documentElement.style.setProperty('--SameShadeColor', '#000000')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#ffffff')
            break;

        // DEREN THEME
        case 3:
            document.documentElement.style.setProperty('--PrimaryColor', '#028A9B')
            document.documentElement.style.setProperty('--SecondaryColor', '#BFA194')
            document.documentElement.style.setProperty('--TertiaryColor', '#F8CF9B')
            document.documentElement.style.setProperty('--FourthColor', '#F8A147')
            document.documentElement.style.setProperty('--FifthColor', '#DE5A5A')
            document.documentElement.style.setProperty('--SixthColor', '#BF3F76')
            document.documentElement.style.setProperty('--SameShadeColor', '#1C3329')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#1C3329')
            break;

        // SAM THEME
        case 4:
            document.documentElement.style.setProperty('--PrimaryColor', '#028A9B')
            document.documentElement.style.setProperty('--SecondaryColor', '#BFA194')
            document.documentElement.style.setProperty('--TertiaryColor', '#F8CF9B')
            document.documentElement.style.setProperty('--FourthColor', '#F8A147')
            document.documentElement.style.setProperty('--FifthColor', '#DE5A5A')
            document.documentElement.style.setProperty('--SixthColor', '#BF3F76')
            document.documentElement.style.setProperty('--SameShadeColor', '#1C3329')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#1C3329')
            break;

        // LENNON THEME
        case 5:
            document.documentElement.style.setProperty('--PrimaryColor', '#028A9B')
            document.documentElement.style.setProperty('--SecondaryColor', '#BFA194')
            document.documentElement.style.setProperty('--TertiaryColor', '#F8CF9B')
            document.documentElement.style.setProperty('--FourthColor', '#F8A147')
            document.documentElement.style.setProperty('--FifthColor', '#DE5A5A')
            document.documentElement.style.setProperty('--SixthColor', '#BF3F76')
            document.documentElement.style.setProperty('--SameShadeColor', '#1C3329')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#1C3329')
            break;

        // RENE THEME
        case 6:
            document.documentElement.style.setProperty('--PrimaryColor', '#028A9B')
            document.documentElement.style.setProperty('--SecondaryColor', '#BFA194')
            document.documentElement.style.setProperty('--TertiaryColor', '#F8CF9B')
            document.documentElement.style.setProperty('--FourthColor', '#F8A147')
            document.documentElement.style.setProperty('--FifthColor', '#DE5A5A')
            document.documentElement.style.setProperty('--SixthColor', '#BF3F76')
            document.documentElement.style.setProperty('--SameShadeColor', '#1C3329')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#1C3329')
            break;

        // BLAINE THEME
        case 7:
            document.documentElement.style.setProperty('--PrimaryColor', '#028A9B')
            document.documentElement.style.setProperty('--SecondaryColor', '#BFA194')
            document.documentElement.style.setProperty('--TertiaryColor', '#F8CF9B')
            document.documentElement.style.setProperty('--FourthColor', '#F8A147')
            document.documentElement.style.setProperty('--FifthColor', '#DE5A5A')
            document.documentElement.style.setProperty('--SixthColor', '#BF3F76')
            document.documentElement.style.setProperty('--SameShadeColor', '#1C3329')
            document.documentElement.style.setProperty('--OppositeShadeColor', '#1C3329')
            break;
    }
}