import { useEffect, useState } from "react";
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";
import { IoMdDesktop } from "react-icons/io";


const THEME_KEY = "theme"; // 'light' | 'dark' | null (system)

export default function ThemeToggle() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(localStorage.getItem(THEME_KEY) ?? "system");

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");

        const apply = (currentMode) => {
            if (currentMode === "system") {
                localStorage.removeItem(THEME_KEY);
                document.documentElement.classList.toggle("dark", mq.matches);
            } else {
                localStorage.setItem(THEME_KEY, currentMode);
                document.documentElement.classList.toggle("dark", currentMode === "dark");
            }
        };

        apply(mode);

        const onChange = (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                document.documentElement.classList.toggle("dark", e.matches);
            }
        };

        if (mode === "system") {
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        }
    }, [mode]);

    const label =
        mode === "system"
            ? "System"
            : `${mode.charAt(0).toUpperCase()}${mode.slice(1)}`;

    return (
        <div className="relative inline-block text-left">
            <button
                className="px-2 py-1 border rounded bg-neutral-100"
                onClick={() => setOpen((o) => !o)}
            >
                {label}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white dark:bg-gray-100 shadow-lg">
                    <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 flex items-center gap-2"
                        onClick={() => setMode("system")}
                    >
                        <IoMdDesktop />
                        <span>System</span>
                    </button>
                    <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                        onClick={() => setMode("light")}
                    >
                        <IoSunnySharp />
                        <span>Light</span>
                    </button>
                    <button
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                        onClick={() => setMode("dark")}
                    >
                        <IoMoonSharp />
                        <span>Dark</span>
                    </button>
                </div>
            )}
        </div>
    );
}
