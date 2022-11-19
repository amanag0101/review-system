import { createContext, useEffect, useState } from "react";

import { Theme } from "../constants/Theme";
import Footer from "../common/footer/Footer";
import Header from "../common/header/Header";
import { getThemeFromLocalStorage, setThemeInLocalStorage } from "../storage/LocalStorage";

interface LayoutContextProps {
    theme: Theme,
    toggleTheme: () => void
}

export const LayoutContext = createContext<LayoutContextProps>({
    theme: Theme.LIGHT,
    toggleTheme: () => {}
});

interface LayoutProps {
    children: JSX.Element
}  

export default function Layout({children} : LayoutProps) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

    useEffect(() => {
        setTheme(getThemeFromLocalStorage());
    }, [])

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    const toggleTheme = () => {
        if(theme === Theme.LIGHT) {
            setTheme(Theme.DARK);
            setThemeInLocalStorage(Theme.DARK);
        }
        else {
            setTheme(Theme.LIGHT);
            setThemeInLocalStorage(Theme.LIGHT);
        }
    }  

    return (
        <LayoutContext.Provider value={{
            theme: theme,
            toggleTheme: toggleTheme
        }}>
            <Header />
            
            { children }

            <Footer />
        </LayoutContext.Provider>
    );
}