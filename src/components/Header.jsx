import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { blogConfig } from '../blogConfig';
import { Sun, Moon, Monitor, Tag, Star, MessageCircle, Search, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Header = () => {
    const { themeMode, setTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    // --- Search Logic ---
    useEffect(() => {
        if (location.pathname === '/search') {
            const params = new URLSearchParams(location.search);
            const q = params.get('q');
            if (q) setQuery(q);
        } else {
            setQuery('');
        }
    }, [location.pathname, location.search]);

    const handleSearch = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(newQuery)}`);
        } else if (location.pathname === '/search') {
            navigate('/search');
        }
    };

    const clearSearch = () => {
        setQuery('');
        if (location.pathname === '/search') {
            navigate('/search');
        }
    };

    // --- Theme Logic ---
    const cycleTheme = () => {
        const modes = ['light', 'dark', 'system'];
        const currentIndex = modes.indexOf(themeMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setTheme(modes[nextIndex]);
    };

    const getIcon = () => {
        switch (themeMode) {
            case 'light': return <Sun className="w-4 h-4" />;
            case 'dark': return <Moon className="w-4 h-4" />;
            case 'system': return <Monitor className="w-4 h-4" />;
            default: return <Monitor className="w-4 h-4" />;
        }
    };

    const navLinkClass = (path) =>
        `p-1.5 rounded-full transition-colors ${location.pathname === path ? 'bg-white/50 text-black dark:bg-white/20 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'}`;

    const isThoughts = location.pathname === '/thoughts';

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl px-4 pointer-events-none"
        >
            {/* ISLAND 1: Logo & Nav Tools */}
            <nav className="pointer-events-auto flex items-center gap-1 p-1 rounded-full backdrop-blur-2xl bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20">
                <Link to="/" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-colors mr-1">
                    <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                        B
                    </span>
                </Link>

                <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

                <Link to="/categories" className={navLinkClass('/categories')} aria-label="Categories">
                    <Tag size={18} />
                </Link>
                <Link to="/favorites" className={navLinkClass('/favorites')} aria-label="Favorites">
                    <Star size={18} />
                </Link>
            </nav>

            {/* ISLAND 2: Integrated Search */}
            <div className="pointer-events-auto relative flex-1 w-full max-w-md">
                <div className="relative flex items-center w-full p-0.5 rounded-full backdrop-blur-2xl bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 transition-all focus-within:bg-white/80 dark:focus-within:bg-black/60 focus-within:ring-2 focus-within:ring-cyan-500/20">
                    <Search className="absolute left-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="w-full py-2 pl-9 pr-9 bg-transparent border-none outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500/80"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        </button>
                    )}
                </div>
            </div>

            {/* ISLAND 3: View Switcher (Blog/Thoughts) */}
            <div className="pointer-events-auto flex items-center p-1 rounded-full backdrop-blur-2xl bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 relative">
                <Link
                    to="/"
                    className={`relative z-10 px-4 h-8 flex items-center justify-center text-sm font-medium transition-colors duration-200 ${!isThoughts ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                >
                    {!isThoughts && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 rounded-full bg-white dark:bg-white/20 shadow-sm -z-10"
                            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                        />
                    )}
                    Blog
                </Link>
                <Link
                    to="/thoughts"
                    className={`relative z-10 px-4 h-8 flex items-center justify-center text-sm font-medium transition-colors duration-200 ${isThoughts ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                >
                    {isThoughts && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 rounded-full bg-white dark:bg-white/20 shadow-sm -z-10"
                            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                        />
                    )}
                    Thoughts
                </Link>
            </div>

            {/* ISLAND 4: Independent Theme Toggle */}
            <div className="pointer-events-auto">
                <motion.button
                    onClick={cycleTheme}
                    whileTap={{ scale: 0.9, rotate: 15 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-2xl bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-black/60 transition-all overflow-hidden"
                    aria-label="Toggle theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={themeMode}
                            initial={{ y: -20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            {themeMode === 'light' ? (
                                <Sun className="w-5 h-5 text-amber-500 fill-amber-500" />
                            ) : themeMode === 'dark' ? (
                                <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400" />
                            ) : (
                                <Monitor className="w-5 h-5" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.header>
    );
};

export default Header;
