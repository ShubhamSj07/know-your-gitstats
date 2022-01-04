import { useEffect, useState } from "react";

export const useDarkMode = () => {
  function getTheme() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("isDarkMode"));
    }

    return false;
  }

  const [isDark, setIsDark] = useState(getTheme());

  const toggleTheme = () => {
    setIsDark(prevTheme => !prevTheme);
    localStorage.setItem("isDarkMode", !isDark);
  };

  return [isDark, toggleTheme];
};
