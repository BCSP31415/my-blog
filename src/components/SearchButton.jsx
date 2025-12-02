import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchButton = () => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="fixed top-4 right-4 z-50"
        >
            <Link
                to="/search"
                className="flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 shadow-lg shadow-black/5 hover:bg-white/20 dark:hover:bg-black/20 transition-all"
                aria-label="Search"
            >
                <Search className="w-5 h-5" />
            </Link>
        </motion.div>
    );
};

export default SearchButton;
