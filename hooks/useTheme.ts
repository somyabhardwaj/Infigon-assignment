'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode theme
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check localStorage and system preference
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
        setIsDark(shouldBeDark);

        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return { isDark, toggleTheme };
}
