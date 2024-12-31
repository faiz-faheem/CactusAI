import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

 const toggleTheme = () => {
   setTheme((prevTheme) => {
     const newTheme = prevTheme === "light" ? "dark" : "light";
     console.log("Theme switched to:", newTheme);
     return newTheme;
   });
 };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
