

module.exports = {
    plugins: [
        {
          plugin: require('craco-plugin-scoped-css')
        }
      ],
    webpack: {
        configure: webpackConfig => {
            webpackConfig.module.rules.push({
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
                
              })
              webpackConfig.output.globalObject = 'this';
             webpackConfig.node.fs = "empty";
             return webpackConfig;
           }
    }
};