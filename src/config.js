const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const config = require('./pre-build.config.js');

module.exports = {
    config,
    getConfig: () => {
        try {
            const customConfigPath = process.argv[2]
                && path.resolve(process.argv[2]);
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const customConfig = require(customConfigPath || path.resolve('./pre-build.config.js'));
            _.merge(module.exports.config, customConfig);
        }
        catch (err) {
            console.log(chalk.yellow('No config file was found!'));
        }
    },
};
