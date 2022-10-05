import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IThemeContext {
  darkMode: boolean;
  ready: boolean;
  dirty: null | boolean;
  toggleThemeHandler: () => void;
  setDirty: Dispatch<SetStateAction<boolean | null>>;
}

const ThemeContext = createContext<IThemeContext>({
  darkMode: true,
  ready: false,
  dirty: null as boolean | null,
  toggleThemeHandler: () => {},
  setDirty: () => {},
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

      if (dirty) {
        setDirty(true);
      } else {
        setDirty(false);
      }
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
      value={{ darkMode, toggleThemeHandler, ready, dirty, setDirty }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
