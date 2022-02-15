import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const mocks = []
const mockContext = import.meta.globEager('./mock/*.js')
Object.keys(mockContext).forEach(v => {
    mocks.push(...mockContext[v].default)
})

export function setupProdMockServer() {
    console.log(mocks)
    createProdMockServer(mocks)
}
