import customerRoutes from './modules/customer'

export const iframeRoutes = customerRoutes.filter(route => route.meta && route.meta.iframeSrc)