import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
    theme: "system",
    setTheme: () => {},
})

export const ThemeProvider = ({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme"
}) =>  {
    const validThemes = ["light", "dark", "system"];
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem(storageKey);
        return validThemes.includes(storedTheme) ? storedTheme : defaultTheme;
    })

    useEffect(() => {
        localStorage.setItem(storageKey, theme);

        const root = document.documentElement;
        root.classList.remove("light", "dark");

        const activeTheme =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
            : theme;

        root.classList.add(activeTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

