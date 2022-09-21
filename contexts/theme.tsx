import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext({
  darkMode: true,
  toggleThemeHandler: () => {},
});

interface ThemeContextProps {
  children?: ReactNode;
}

export function ThemeContextProvider(props: ThemeContextProps): ReactElement {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (
      localStorage.theme === "dark"
      // ||
      // (!("theme" in localStorage) &&
      //   window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  function toggleThemeHandler() {
    setDarkMode((prev) => {
      if (prev === false) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return !prev;
    });
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
