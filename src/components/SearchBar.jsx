import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState('');

    // Sync local state with URL query param if on search page
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

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hidden lg:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
            <div className="relative flex items-center w-full backdrop-blur-2xl bg-white/10 dark:bg-black/30 border border-white/20 rounded-full shadow-lg shadow-black/5 transition-all focus-within:bg-white/20 dark:focus-within:bg-black/40 focus-within:border-white/30 focus-within:shadow-xl ring-1 ring-white/10">
                <Search className="absolute left-4 w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search articles..."
                    className="w-full py-3 pl-10 pr-10 bg-transparent border-none outline-none text-sm text-tempo-text placeholder-gray-500 dark:placeholder-gray-400"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 p-1 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
                    >
                        <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default SearchBar;
