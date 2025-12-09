import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Monitor, Search, X } from 'lucide-react';
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
        }
    }, [location.pathname, location.search]);

    const handleSearch = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(newQuery)}`);
        }
    };

    const cycleTheme = () => {
        const modes = ['light', 'dark', 'system'];
        const nextIndex = (modes.indexOf(themeMode) + 1) % modes.length;
        setTheme(modes[nextIndex]);
    };

    const NavLink = ({ to, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`
                    px-4 py-2 font-mono text-sm border-l-2 border-neo-black h-full flex items-center hover:bg-neo-yellow transition-colors
                    ${isActive ? 'bg-neo-black text-neo-white border-b-4 border-b-neo-yellow' : 'text-neo-black'}
                `}
            >
                {children}
            </Link>
        );
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-neo-black h-16 flex items-center justify-between pl-4 md:pl-8 pr-0">
            {/* Logo Area */}
            <Link to="/" className="font-serif font-black text-2xl tracking-tighter hover:text-gray-600 transition-colors">
                B.LOG
            </Link>

            {/* Right: Nav & Utilities */}
            <div className="flex items-center h-full">
                {/* Search - Desktop hidden for simplicity or brutalist input */}
                <div className="hidden md:flex items-center h-full border-l-2 border-neo-black w-64">
                    <div className="w-10 h-full flex items-center justify-center">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="SEARCH_DB..."
                        className="w-full h-full bg-transparent outline-none font-mono text-xs placeholder:text-gray-400"
                    />
                </div>

                <nav className="flex h-full">
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/thoughts">THOUGHTS</NavLink>
                    {/* Theme Toggle as a block */}
                    <div className="border-l-2 border-neo-black dark:border-white h-full flex items-center px-4 bg-white dark:bg-neo-black transition-colors">
                        <button
                            onClick={cycleTheme}
                            className="relative w-14 h-8 bg-gray-200 dark:bg-gray-800 rounded-full border-2 border-neo-black dark:border-white transition-colors overflow-hidden p-1 flex items-center"
                        >
                            <div className={`absolute top-1 bottom-1 w-6 bg-neo-yellow dark:bg-white rounded-full border border-neo-black dark:border-none shadow-sm transition-transform duration-300 ${themeMode === 'dark' ? 'translate-x-full border-transparent' : 'translate-x-0'}`}>
                                {themeMode === 'dark' && <div className="absolute top-1 right-1 w-2 h-2 bg-gray-900 rounded-full" />}
                            </div>
                            <div className="w-full flex justify-between px-1.5 z-0">
                                <Sun size={12} className="text-gray-500 opacity-50" />
                                <Moon size={12} className="text-gray-400 opacity-50" />
                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
