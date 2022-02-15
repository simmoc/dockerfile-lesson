import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// import postcssImport from 'postcss-import'
// import autoprefixer from 'autoprefixer'
// import tailwindcss from 'tailwindcss'

const fs = require('fs')
const path = require('path')

// https://vitejs.dev/config/
export default ({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    // 读取全局 scss 资源
    const scssResources = []
    fs.readdirSync('src/assets/styles/resources').map(dirname => {
        if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
            scssResources.push(`@import "src/assets/styles/resources/${dirname}";`)
        }
    })
    // 读取css 精灵图相关
    fs.readdirSync('src/assets/sprites').map(dirname => {
        if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
            // css 精灵图生成的 scss 文件也需要放入全局 scss 资源
            scssResources.push(`@import "src/assets/sprites/_${dirname}.scss";`)
        }
    })
    return defineConfig({
        base: './',
        // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
        server: {
            open: true,
            port: 9000,
            proxy: {
                '/proxy': {
                    target: env.VITE_APP_API_BASEURL,
                    changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
                    rewrite: path => path.replace(/\/proxy/, '')
                }
            }
        },
        // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
        build: {
            outDir: mode == 'production' ? 'dist' : 'dist',
            sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
            terserOptions: {
                compress: {
                    drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true'
                }
            }
        },
        // 各种插件
        plugins: createVitePlugins(env, command === 'build'),
        // 设置别名
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        // 配置scss变量
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: scssResources.join('')
                }
            },
            // postcss: {
            //     plugins: [
            //         postcssImport,
            //         autoprefixer
            //         // tailwindcss
            //     ]
            // }

            postcss: {
                plugins: [
                    // 前缀追加
                    require('autoprefixer')({
                        overrideBrowserslist: [
                            'Android 4.1',
                            'iOS 7.1',
                            'Chrome > 31',
                            'ff > 31',
                            'ie >= 8',
                            '> 1%'
                        ],
                        grid: true
                    }),
                    require('postcss-flexbugs-fixes')
                ]
            }
        }
    })
}
