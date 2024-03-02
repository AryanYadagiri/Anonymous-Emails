import React, { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  themeChange: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState(false);

  const themeChange = () => {
    setTheme(!theme);
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    themeChange,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { useTheme, ThemeProvider, ThemeContext };
