/**
 * @flow
 */

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

/**
 * Get the routes that should be added to the app for each plugin
 * @param loadModule
 * @param errorLoading
 * @param injectSagas
 * @returns {*}
 */
export function getPluginRoutes(loadModule, errorLoading, injectSagas) {
  return plugins.reduce((routes, pluginEntry) => routes.concat(pluginEntry.plugin.getRoutes(pluginEntry.config, loadModule, errorLoading, injectSagas)), []);
}

/**
 * Get the sagas that should be included in every route
 * @returns {*}
 */
export function getGlobalSagaModules() {
  return plugins.reduce((globalSagaModules, pluginEntry) => globalSagaModules.concat(pluginEntry.plugin.getGlobalSagaModules(pluginEntry.config)), []);
}

/**
 * Get the reducers that should be included in every route
 * @returns {*}
 */
export function getGlobalReducers() {
  const reducers = plugins.map((pluginEntry) => pluginEntry.plugin.getGlobalReducers(pluginEntry.config));
  return Object.assign({}, ...reducers);
}

