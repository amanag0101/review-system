import { Theme } from "../constants/Theme"

export const setThemeInLocalStorage = (theme: Theme) => {
    localStorage.setItem("theme", theme);
}

export const getThemeFromLocalStorage = () : Theme => {
    const theme = localStorage.getItem("theme");
    return theme === "dark" ? Theme.DARK : Theme.LIGHT;
}