import React from 'react';

const Footer = () => {
    return (
        <footer className="px-6 md:px-12 py-8 border-t border-tempo-border text-center text-sm text-gray-600">
            © {new Date().getFullYear()} BCSP.blog. All rights reserved.
        </footer>
    );
};

export default Footer;
