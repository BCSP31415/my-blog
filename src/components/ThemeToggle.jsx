import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
    const { themeMode, setTheme } = useTheme();

    const cycleTheme = () => {
        const modes = ['light', 'dark', 'system'];
        const currentIndex = modes.indexOf(themeMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setTheme(modes[nextIndex]);
    };

    const getIcon = () => {
        switch (themeMode) {
            case 'light':
                return <Sun className="w-5 h-5" />;
            case 'dark':
                return <Moon className="w-5 h-5" />;
            case 'system':
                return <Monitor className="w-5 h-5" />;
            default:
                return <Monitor className="w-5 h-5" />;
        }
    };

    const getLabel = () => {
        switch (themeMode) {
            case 'light':
                return '日间';
            case 'dark':
                return '夜间';
            case 'system':
                return '跟随系统';
            default:
                return '跟随系统';
        }
    };

    return (
        <button
            onClick={cycleTheme}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 text-tempo-text"
            aria-label="Toggle theme"
        >
            {getIcon()}
            <span className="text-sm font-medium">{getLabel()}</span>
        </button>
    );
};

export default ThemeToggle;
