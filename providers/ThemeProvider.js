import { useColorScheme } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import stylesConfig from "../config/styles";

export const ThemeContext = createContext({
    dark: false,
    colors: stylesConfig.colors.lightThemeColors,
    setScheme: () => { }
})

export const ThemeProvider = (props) => {
    const colorScheme = useColorScheme(colorScheme == "dark");
    const [isDark, setIsDark] = useState(colorScheme == "dark");

    useEffect(() => {
        setIsDark(colorScheme == "dark");
    }, [colorScheme]);

    const defaultTheme = {
        dark: isDark,
        colors: isDark ? stylesConfig.colors.darkThemeColors : stylesConfig.colors.lightThemeColors,
        setScheme: (scheme) => setIsDark(scheme === "dark")
    }
    
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)