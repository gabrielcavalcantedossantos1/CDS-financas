import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTheme } from "../redux/slice/themeSlice";

const LOCAL_STORAGE_THEME_KEY = import.meta.env.VITE_LOCAL_STORAGE_THEME_KEY;

export const useTheme = () => {
  const { theme } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  const handleInitTheme = () => {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

    if (theme === "light") {
      dispatch(setTheme("light"));
    } else if (theme === "dark") {
      dispatch(setTheme("dark"));
    }
  };

  const handleToggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, "dark");
      dispatch(setTheme("dark"));
    } else {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, "light");
      dispatch(setTheme("light"));
    }
  };

  return {
    theme,
    handleInitTheme,
    handleToggleTheme,
  };
};
