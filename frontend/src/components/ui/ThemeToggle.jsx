import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-10 right-10 z-100 p-5 rounded-full shadow-lg bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 transition-colors cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
