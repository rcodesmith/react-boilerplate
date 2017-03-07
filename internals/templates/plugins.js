

import plugins from './pluginsConfig';

export function initPlugins() {
  plugins.forEach((pluginEntry) => {
    pluginEntry.plugin.init(pluginEntry.config);
  });
}

export function postAppInitHook(App) {
  plugins.forEach((pluginEntry) => {
    pluginEntry.plugin.postAppInitHook(pluginEntry.config, App);
  });
}
export function getPluginRoutes(loadModule, errorLoading, injectSagas) {
  return plugins.reduce((routes, pluginEntry) => routes.concat(pluginEntry.plugin.getRoutes(pluginEntry.config, loadModule, errorLoading, injectSagas)), []);
}

export function getGlobalSagaModules() {
  return plugins.reduce((globalSagaModules, pluginEntry) => globalSagaModules.concat(pluginEntry.plugin.getGlobalSagaModules(pluginEntry.config)), []);
}
