import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogConfig } from '../data';
import { Sun, Moon, Monitor, FolderOpen, Star, Search } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Header = () => {
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
                return <Sun className="w-4 h-4" />;
            case 'dark':
                return <Moon className="w-4 h-4" />;
            case 'system':
                return <Monitor className="w-4 h-4" />;
            default:
                return <Monitor className="w-4 h-4" />;
        }
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 left-4 z-50 flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 shadow-lg shadow-black/5"
        >
            <div className="text-lg font-bold tracking-tight text-tempo-text">
                {blogConfig.name}
            </div>
            <div className="w-px h-5 bg-white/20"></div>

            {/* Mobile Search Button */}
            <Link
                to="/search"
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Search"
            >
                <Search className="w-4 h-4" />
            </Link>

            <Link
                to="/categories"
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Categories"
            >
                <FolderOpen className="w-4 h-4" />
            </Link>
            <Link
                to="/favorites"
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Favorites"
            >
                <Star className="w-4 h-4" />
            </Link>
            <button
                onClick={cycleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
            >
                {getIcon()}
            </button>
        </motion.header>
    );
};

export default Header;
