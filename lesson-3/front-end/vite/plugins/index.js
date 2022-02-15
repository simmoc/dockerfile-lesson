import vue from '@vitejs/plugin-vue'

import createRestart from './restart'
import createHtml from './html'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createMock from './mock'
import createCompression from './compression'
import createSpritesmith from './spritesmith'
import createBanner from './banner'
import createEslint from './eslint'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    !isBuild && vitePlugins.push(createRestart())
    vitePlugins.push(createHtml(viteEnv, isBuild))
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createComponents())
    vitePlugins.push(createSvgIcon(isBuild))
    vitePlugins.push(createMock())
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    vitePlugins.push(...createSpritesmith(isBuild))
    vitePlugins.push(createBanner())
    vitePlugins.push(createEslint())
    return vitePlugins
}