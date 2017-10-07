import webpack from 'webpack';
import webpackMW from 'webpack-dev-middleware';
import webpackHotMW from 'webpack-hot-middleware';
import webpackConfig from '~/webpack.config.dev.babel';
import { log } from '@/util/logger';
import path from 'path';

const compiler = webpack(webpackConfig);

const devMiddleware = webpackMW(compiler, {
  stats: {
    colors: true,
    assets: false,
    hash: false,
    version: false,
    timings: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: true,
    publicPath: false,
    chunkModules: false
  }
});

const hotMiddleware = webpackHotMW(compiler, {
  log: () => {}
});

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    log.info('Template has been changed reloading page');
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

const html = function (req, res, next) {
  const filename = path.join(compiler.outputPath, 'index.html');
  devMiddleware.waitUntilValid(() => {
    devMiddleware.fileSystem.readFile(filename, (err, result) => {
      if (err) {
        next(err);
        return;
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
};

export default {
  compiler,
  devMiddleware,
  hotMiddleware,
  html
};
