import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (toggleRef.current) {
            gsap.fromTo(
                toggleRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, []);

    return (
        <button
            ref={toggleRef}
            onClick={toggleTheme}
            style={{
                background: "transparent",
                border: "1px solid var(--text-primary)",
                color: "var(--text-primary)",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--text-primary)";
                e.currentTarget.style.color = "var(--bg-primary)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-primary)";
            }}
        >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;
