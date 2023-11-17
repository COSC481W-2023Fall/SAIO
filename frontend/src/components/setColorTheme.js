export default function setSiteColorTheme(num) {
    switch (num) {
        case 1:
            document.documentElement.style.setProperty('--PrimaryColor', '#ff0000')
            document.documentElement.style.setProperty('--SecondaryColor', '#00ff00')
            document.documentElement.style.setProperty('--TertiaryColor', '#0000ff')
            document.documentElement.style.setProperty('--FourthColor', '#ffff00')
            document.documentElement.style.setProperty('--FifthColor', '#ff00ff')
            document.documentElement.style.setProperty('--SixthColor', '#00ffff')
            break;
        case 2:
            document.documentElement.style.setProperty('--PrimaryColor', '#FFF1C4')
            document.documentElement.style.setProperty('--SecondaryColor', '#FECD67')
            document.documentElement.style.setProperty('--TertiaryColor', '#FFA938')
            document.documentElement.style.setProperty('--FourthColor', '#7B7C80')
            document.documentElement.style.setProperty('--FifthColor', '#C0E4E4')
            document.documentElement.style.setProperty('--SixthColor', '#D6F3F9')
            break;
        case 3:
            document.documentElement.style.setProperty('--PrimaryColor', '#028A9B')
            document.documentElement.style.setProperty('--SecondaryColor', '#BFA194')
            document.documentElement.style.setProperty('--TertiaryColor', '#F8CF9B')
            document.documentElement.style.setProperty('--FourthColor', '#F8A147')
            document.documentElement.style.setProperty('--FifthColor', '#DE5A5A')
            document.documentElement.style.setProperty('--SixthColor', '#BF3F76')
            break;
    }
}