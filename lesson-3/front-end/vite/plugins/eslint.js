import eslintPlugin from 'vite-plugin-eslint'

export default function createEslint() {
    return eslintPlugin({
        cache: false
    })
}
