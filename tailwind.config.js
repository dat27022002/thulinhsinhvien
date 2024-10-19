/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-100': 'var(--primary-100)',
                'primary-200': 'var(--primary-200)',
                'primary-500': 'var(--primary-500)',
                'primary-700': 'var(--primary-700)',
                secondnary: 'var(--secondnary)',
                'color-text': 'var(--color-text)',
                'color-text-secondnary': 'var(--color-text-secondnary)',
                'color-text-third': 'var(--color-text-third)',
                'color-border': 'var(--color-border)',
                'color-white': 'var(--background-color-white)',
                'bg-hover-primary': 'var(--bg-hover-primary)',
            },
            boxShadow: {
                custom: '0px 5px 15px rgba(0, 0, 0, 0.35)',
            },
        },
    },
    plugins: [],
};
