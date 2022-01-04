import { createContext, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

export const ThemeContext = createContext({});

export const ThemeProvider = props => {
  const [theme, setTheme] = useDarkMode();
  return (
    <ThemeContext.Provider value={{ isDarkTheme: theme, onToggle: setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
