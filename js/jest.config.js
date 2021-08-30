// We override tsdx's jest.config.js to have it do the exact same thing for .js
// files that it does for .tsx files. Documentation:
// https://tsdx.io/customization#jest. Doing this also required setting
// "allowJs" to true in tsconfig.json.
module.exports = {
    transform: {
        '.(ts|tsx|js|jsx)$': require.resolve('ts-jest/dist'),
    },
}