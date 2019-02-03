export const getPlugin = () => import('./plugin');

export const getUIPlugins = () => [import('./web-menu'), import('./web-store')];
