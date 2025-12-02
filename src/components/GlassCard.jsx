import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true }) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { scale: 1.02, y: -5 } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
                relative overflow-hidden rounded-3xl
                bg-white/10 dark:bg-black/20
                backdrop-blur-xl border border-white/20
                shadow-lg shadow-black/5
                transition-all duration-300
                hover:bg-white/20 dark:hover:bg-black/30
                hover:border-white/30 hover:shadow-2xl hover:shadow-cyan-500/10
                group
                ${className}
            `}
            style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            }}
        >
            {/* Top highlight for glass edge effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

            {children}
        </motion.div>
    );
};

export default GlassCard;
