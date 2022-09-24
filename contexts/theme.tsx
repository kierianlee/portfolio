import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext({
  darkMode: true,
  ready: false,
  dirty: null as boolean | null,
  toggleThemeHandler: () => {},
});

interface ThemeContextProps {
  children?: ReactNode;
}

export function ThemeContextProvider(props: ThemeContextProps): ReactElement {
  const [darkMode, setDarkMode] = useState(true);
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState<boolean | null>(null);

  useEffect(() => {
    if (window !== undefined) {
      const dirty = localStorage.getItem("dirty") === "true";

      if (!dirty) {
        localStorage.setItem("dirty", "true");
      }

      setDirty(dirty);
    } else {
      setDirty(false);
    }

    setReady(true);
  }, []);

  // useEffect(() => {
  //   if (dirty !== null) {
  //     setReady(true);
  //   }
  // }, [dirty]);

  useEffect(() => {
    if (
      localStorage.theme === "light"
      // ||
      // (!("theme" in localStorage) &&
      //   window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
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
    <ThemeContext.Provider
      value={{ darkMode, toggleThemeHandler, ready, dirty }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
