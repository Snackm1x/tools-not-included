const path = require('path');
const { updateConfig } = require('react-app-rewire-antd-theme');
const { getLoader, loaderNameMatches } = require("react-app-rewired");

const options = {
    varFile: path.join(__dirname, './src/theme.less')
  }

module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        rule => loaderNameMatches(rule, 'ts-loader')
      );
      
      if (!tsLoader) {
        console.log ('ts-loader was not found');
        return config;
      }

      const tsImportPluginFactory = require('ts-import-plugin');

      tsLoader.options = {
        ...tsLoader.options,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true
            })]
        })
    };

    config = updateConfig(config, env, options);
    return config;
  }