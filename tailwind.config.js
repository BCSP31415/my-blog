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
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        // Base text
                        color: theme('colors.gray.300'),
                        lineHeight: '2', // Very loose line height for "breathing room"
                        fontSize: '1.125rem', // 18px base size

                        // Paragraphs
                        p: {
                            marginTop: '0',
                            marginBottom: '2em', // Huge spacing between paragraphs
                        },

                        // Headers - Territory
                        h1: {
                            color: theme('colors.tempo-text'),
                            fontWeight: '900', // Black weight
                            fontSize: '2.5em',
                            marginTop: '0',
                            marginBottom: '1em',
                            lineHeight: '1.1',
                        },
                        h2: {
                            color: theme('colors.tempo-text'),
                            fontWeight: '800', // ExtraBold
                            fontSize: '2em',
                            marginTop: '3em', // Massive space above sections
                            marginBottom: '1em',
                            lineHeight: '1.2',
                            borderBottom: '1px solid rgba(255,255,255,0.1)', // Visual separator
                            paddingBottom: '0.5em',
                        },
                        h3: {
                            color: theme('colors.tempo-text'),
                            fontWeight: '700',
                            fontSize: '1.5em',
                            marginTop: '2.5em',
                            marginBottom: '0.75em',
                        },

                        // Highlights - Visual Anchors
                        strong: {
                            color: '#22d3ee', // Cyan
                            fontWeight: '900', // Black weight
                        },

                        // Lists - Graphical
                        ul: {
                            listStyleType: 'disc',
                            paddingLeft: '1.5em',
                            marginBottom: '2em',
                        },
                        ol: {
                            listStyleType: 'decimal',
                            paddingLeft: '1.5em',
                            marginBottom: '2em',
                        },
                        'ul > li': {
                            paddingLeft: '0.5em',
                            marginBottom: '0.5em', // Space between list items
                        },
                        'ul > li::marker': {
                            color: '#22d3ee', // Cyan bullets
                        },
                        'ol > li': {
                            paddingLeft: '0.5em',
                            marginBottom: '0.5em',
                        },
                        'ol > li::marker': {
                            color: '#22d3ee', // Cyan numbers
                            fontWeight: '700',
                        },

                        // Quotes
                        blockquote: {
                            color: theme('colors.gray.200'),
                            borderLeftColor: '#22d3ee',
                            borderLeftWidth: '4px',
                            fontStyle: 'italic',
                            paddingLeft: '1.5em',
                            marginTop: '2.5em',
                            marginBottom: '2.5em',
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
