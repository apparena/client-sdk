/***** WARNING: ES5 code only here. Not transpiled! *****/
/* eslint-disable */
/* eslint-disable no-var */

const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const uniq = require('lodash/uniq');
const merge = require('webpack-merge');


const isProduction = !!((argv.env && argv.env.production) || argv.p || process.env.NODE_ENV === 'production');
const userConfig = isProduction ? require('../config') : require('../config.json');
const rootPath = (userConfig.paths && userConfig.paths.root)
    ? userConfig.paths.root
    : process.cwd();


if (isProduction) {
    userConfig.entry = merge(userConfig.entry, userConfig.productionEntry);
}

const config = merge({
    copy: 'images/**/*',
    proxyUrl: 'http://manager.local',
    cacheBusting: '[name]_[hash]',
    paths: {
        root: rootPath,
        js: path.resolve(rootPath, 'lib'),
        dist: path.resolve(rootPath, 'dist')
    },
    enabled: {
        bail: isProduction,
        sourceMaps: !isProduction,
        optimize: isProduction,
        cacheBusting: isProduction,
        watcher: !!argv.watch,
        watch: !!argv.w,
        eslint: !isProduction
    },
    watch: [],
    languages: [],
    browsers: []
}, userConfig);

config.watch.push(`${path.basename(config.paths.js)}/${config.copy}`);
config.watch = uniq(config.watch);
config.babelFile = isProduction ? './babel.prod' : './babel.dev';

module.exports = merge(config, {
    env: Object.assign({production: isProduction, development: !isProduction, nodeEnv: process.env.NODE_ENV}, argv.env),
    publicPath: `${config.publicPath}/${path.basename(config.paths.dist)}/`,
    manifest: {}
});

/**
 * If your publicPath differs between environments, but you know it at compile time,
 * then set AM_DIST_PATH as an environment variable before compiling.
 * Example:
 *   AM_DIST_PATH=/public/appmanger/components yarn build:production
 */
if (process.env.AM_DIST_PATH) {
    module.exports.publicPath = process.env.AM_DIST_PATH;
}

/* eslint-enable no-var */
/* eslint-enable */
