module.exports = {
    cacheDirectory: './.babel-cache',
    presets: [
        ['env', {modules: false}],
        'stage-0',
        'react',
        'flow',
    ],
    plugins: [
        'syntax-trailing-function-commas',
        'transform-class-properties',
        'transform-object-rest-spread',
        'transform-decorators-legacy',
        require.resolve('./bundle/babel-plugin-transform-async'),
    ]
};
