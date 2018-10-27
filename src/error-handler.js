const chalk = require('chalk');

/**
 * Error handler function
 * @param {string} file - The file in which the error occur.
 * @param {...string} message - Message of the error.
 * @returns {undefined}
 */
module.exports = function errorHandler(file, ...message) {
    console.log(chalk.bold.red(`Error at file ${file}`));
    console.log.apply(null, message);
    process.exit(1);
};
