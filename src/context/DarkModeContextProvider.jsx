import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "./../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-clor-scheme: dark)").matches,
    "isDarkMode"
  );
  const ToggleDarkMode = () => setIsDarkMode((mode) => !mode);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );
  return (
    <DarkModeContext.Provider value={{ isDarkMode, ToggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) throw new Error("useDarkMode was not used within its provider");
  return context;
}

export { DarkModeContextProvider, useDarkMode };
