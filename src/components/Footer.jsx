import React from 'react';

const Footer = () => {
    return (
        <footer className="px-6 md:px-12 py-8 border-t border-neo-black dark:border-white text-center text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-[#161616] transition-colors">
            © {new Date().getFullYear()} BCSP.blog. All rights reserved.
        </footer>
    );
};

export default Footer;
