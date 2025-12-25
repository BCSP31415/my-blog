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
                serif: ['var(--font-serif)', '"Songti SC"', '"Noto Serif SC"', '"STSong"', '"华文宋体"', '"SimSun"', '"宋体"', 'serif'],
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
                        maxWidth: 'none',
                        color: 'inherit',
                        a: {
                            color: 'inherit',
                            textDecoration: 'none',
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
