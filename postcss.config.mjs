/** @type {import('postcss-load-config').Config} */

import autoprefixer from 'autoprefixer' // Import autoprefixer explicitly
import postcssPxtorem from 'postcss-pxtorem'

const config = {
    plugins: [
        // postcssPxtorem({
        //     rootValue: 75, // Design width / 10 (for example, 375 -> 37.5; 750 -> 75)
        //     propList: ['*'], // Properties to convert; '*' means all properties
        //     unitPrecision: 5, // Number of decimal places to keep after conversion
        //     selectorBlackList: [], // Selectors to ignore, such as classes beginning with '.ignore-'
        //     replace: true, // Replace directly instead of adding a fallback
        //     mediaQuery: false, // Whether to convert px in media queries
        //     minPixelValue: 1, // Do not convert values less than or equal to 1px
        //     exclude: /node_modules/i, // Ignore files in node_modules
        // }),
        // Option 1: Pass a configured plugin instance directly (recommended)
        autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR', 'not dead', 'iOS >= 9', 'Android >= 4.4'],
            grid: true,
            flexbox: true,
            cascade: true,
        }),
    ],
    // Mark plugin compatibility (required by PostCSS v8+)
    postcss: true,
}

export default config
