/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{html,js,tsx}', './components/**/*.{html,js,tsx}', './constants/global.ts'],
    theme: {
        backgroundImage: {
            teds: "url('/assets/images/ted-city.webp')",
        },
        colors: {
            white: '#FFFFFF',
            white_alpha8: '#FFFFFF14',
            black: '#000000',
            gray: {
                1: '#D6DBF1',
                2: '#B1B7D4',
                3: '#8B91AF',
                4: '#70748C',
                5: '#636880',
                6: '#515567',
                7: '#3D404E',
                8: '#313440',
                9: '#282A34',
                10: '#1E2028',
                11: '#15161B',
                300: '#E5E7EB',
                500: '#9CA3AF',
                700: '#4B5563',
                800: '#404D5F',
                900: '#212933',
            },
            green: {
                500: '#76D280',
            },
            blue: {
                500: '#00A3FF',
            },
            teal: {
                500: '#00F0FF',
            },
            pink: {
                500: '#DEA7FF',
            },
            purple: {
                75: '#5865F2BF',
                45: '#5865F273',
                20: '#5865F233',
                500: '#5865F2',
                600: '#505CDE',
            },
            red: {
                500: '#FB4571',
                600: '#ED3864',
            },
            teal: {
                500: '#00F0FF',
            },
            border: {
                alert: '#FB45714D',
                default: '#FFFFFF14',
            },
        },
        fontFamily: {
        },
        container: {
            screens: {
                sm: '390px',
                md: '640px',
                lg: '940px',
                xl: '1200px',
                '2xl': '1200px',
                '3xl': '1200px',
            },
        },
        screens: {
            xs: '390px',
            sm: '530px',
            md: '768px',
            lmd: '900px',
            lg: '1200px',
            xl: '1440px',
            '2xl': '1600px',
            '3xl': '1920px',
        },
        extend: {
            minHeight: { screen: '100vh' },
            borderRadius: {
                regular: '6px',
                min: '4px',
                DEFAULT: '4px',
                btn: '4px',
            },
            fontSize: {
                headline_big: '30px',
                headline_med: '24px',
                headline_sm: '21px',
                label: '18px',
                label_md: '15px',
                label_xs: '10px',
                copy: '13px',
            },
            gridTemplateColumns: {
                '2auto': 'repeat(2, auto)',
            },
            borderWidth: {
                card: '3px',
            },
            width: {
                'media-vertical-card': '234px',
            },
            height: {
                'media-vertical-card': '231px',
            },
            maxWidth: { 'vertical-card': '234px' },
            maxHeight: {
                airbase: '810px',
            },
        },
    },
    daisyui: {
        themes: [
            {
                aces: {
                    primary: '#15161B',
                    secondary: '#5865F2',
                    accent: '#1E2028',
                    neutral: '#3d4451',
                    'base-100': '#ffffff',
                    error: '#FB4571',
                },
                night: {
                    primary: '#15161B',
                    secondary: '#5865F2',
                    accent: '#1E2028',
                    neutral: '#3d4451',
                    'base-100': '#1E2028',
                    error: '#FB4571',
                },
            },
            "cyberpunk",
            'light',
            'dark',
        ],
    },
    plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
}
