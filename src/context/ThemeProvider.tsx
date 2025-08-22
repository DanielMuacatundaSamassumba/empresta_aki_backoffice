import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(()=>{
     if( darkMode){
         document.documentElement.classList.add("dark"); 
         localStorage.setItem("theme", "dark");
     }else{
        document.documentElement.classList.remove("dark"); 
        localStorage.setItem("theme", "light");
     }
  }, [darkMode])
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const UseDarkMode = ()=> useContext(ThemeContext)