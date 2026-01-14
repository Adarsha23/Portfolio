/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neonCyan: "#00f3ff",
                neonPurple: "#bc00ff",
                darkBg: "#0a0a0a",
                cardBg: "#161616",
            },
            animation: {
                'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
                    '50%': { opacity: 0.8, filter: 'brightness(1.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            backgroundImage: {
                'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 40L40 40L40 0' fill='none' stroke='%23ffffff05' stroke-width='1'/%3E%3C/svg%3E\")",
            }
        },
    },
    plugins: [],
}
