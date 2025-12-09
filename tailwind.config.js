/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'tempo-bg': 'var(--color-tempo-bg)',
                'tempo-text': 'var(--color-tempo-text)',
                'tempo-border': 'var(--color-tempo-border)',
                'tempo-accent': 'var(--color-tempo-accent)',
                'neo-yellow': 'var(--color-neo-yellow)',
                'neo-black': 'var(--color-neo-black)',
                'neo-white': 'var(--color-neo-white)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                serif: ['var(--font-serif)', '"Songti SC"', '"SimSun"', '"STSong"', '"华文宋体"', 'serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
            boxShadow: {
                'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
                'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        // Base text
                        color: theme('colors.gray.700'),
                        fontFamily: '"Playfair Display", "Songti SC", "SimSun", "STSong", "华文宋体", serif', // User requested Songti for Chinese
                        lineHeight: '1.8',
                        fontSize: '1.125rem',

                        // Paragraphs
                        p: {
                            marginTop: '0',
                            marginBottom: '1.5em',
                        },

                        // Headers
                        h1: {
                            color: theme('colors.black'),
                            fontFamily: '"Playfair Display", "Songti SC", "SimSun", "STSong", "华文宋体", serif',
                            fontWeight: '900',
                            fontSize: '3em',
                            marginTop: '0',
                            marginBottom: '0.5em',
                            lineHeight: '1.1',
                        },
                        h2: {
                            color: theme('colors.black'),
                            fontFamily: '"Playfair Display", "Songti SC", "SimSun", "STSong", "华文宋体", serif',
                            fontWeight: '800',
                            fontSize: '2.25em',
                            marginTop: '2em',
                            marginBottom: '1em',
                            lineHeight: '1.2',
                            borderBottom: '2px solid #000', // Neo border
                            paddingBottom: '0.2em',
                        },
                        h3: {
                            color: theme('colors.black'),
                            fontFamily: '"Playfair Display", "Songti SC", "SimSun", "STSong", "华文宋体", serif',
                            fontWeight: '700',
                            fontSize: '1.75em',
                            marginTop: '2em',
                            marginBottom: '0.75em',
                        },

                        // Highlights
                        strong: {
                            color: theme('colors.black'),
                            fontWeight: '700',
                            backgroundColor: 'var(--color-neo-yellow)', // Highlight effect
                            padding: '0 4px',
                        },

                        // Lists
                        ul: {
                            listStyleType: 'disc',
                            paddingLeft: '1.5em',
                            marginBottom: '2em',
                        },
                        'ul > li::marker': {
                            color: theme('colors.black'),
                        },

                        // Quotes
                        blockquote: {
                            color: theme('colors.black'),
                            borderLeftColor: theme('colors.black'),
                            borderLeftWidth: '4px',
                            fontFamily: '"Playfair Display", "Songti SC", "SimSun", "STSong", "华文宋体", serif',
                            fontStyle: 'italic',
                            fontWeight: '500',
                            fontSize: '1.5em', // Editorial quote size
                            paddingLeft: '1em',
                            marginTop: '2em',
                            marginBottom: '2em',
                        },

                        // Code
                        code: {
                            fontFamily: '"Space Mono", monospace',
                            backgroundColor: '#f1f5f9',
                            padding: '2px 4px',
                            borderRadius: '2px',
                            fontWeight: '400',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
