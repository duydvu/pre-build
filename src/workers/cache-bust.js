const find = require('find');
const path = require('path');
const queryTarget = require('../query-target');
const { config } = require('../config');

/**
 * Cache busting by inserting hash to resource's file name
 * @param {Document} document - The Document object.
 * @param {Object} todo - The todo object.
 * @returns {(string|undefined)} - Message of the error or undefined if no error occurred.
 */
module.exports = (document, todo) => {
    const {
        query,
        attribute,
        findDir,
        publicPath,
        regex,
    } = Object.assign({}, config.cacheBust, todo);

    const { target, error } = queryTarget(document, query);
    if (error) {
        return error;
    }

    const sources = find.fileSync(regex, path.resolve(findDir));

    if (sources.length !== 1) {
        return `There's must be only 1 ${regex} file in the ${findDir} directory. But found ${sources.length}.`;
    }

    const hashFile = sources[0].match(/^\/(.+\/)*(.+)\.(.+)$/).slice(2, 4).join('.');
    const attrValue = path.join(publicPath, hashFile);
    target.setAttribute(attribute, attrValue);

    return undefined;
};
